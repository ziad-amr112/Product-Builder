"use client";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import { categories } from "../../data";
import { ICategory } from "../../interfaces";

interface IProps {
  selected: { name: string; imageURL: string };
  setSelected: (category: ICategory) => void;
}

const Select = ({ selected, setSelected }: IProps) => {
  return (
    <div className="relative z-50">
      <Listbox value={selected} onChange={setSelected}>
        <Label className="block text-sm font-medium text-gray-700">
          Category
        </Label>
        <div className="relative mt-2">
          <ListboxButton className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm">
            <div className="flex items-center gap-2">
              <img
                src={selected.imageURL}
                alt={selected.name}
                className="h-6 w-6 rounded-full"
              />
              <span className="block truncate">{selected.name}</span>
            </div>
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </ListboxButton>
          <ListboxOptions className="absolute left-0 right-0 top-full mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50">
            {categories.map((category) => (
              <ListboxOption
                key={category.id}
                value={category}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-3 pr-9 ${
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <div className="flex items-center">
                      <img
                        src={category.imageURL}
                        alt={category.name}
                        className="h-6 w-6 rounded-full"
                      />
                      <span
                        className={`ml-3 truncate ${
                          selected ? "font-semibold" : "font-normal"
                        }`}
                      >
                        {category.name}
                      </span>
                    </div>
                    {selected && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
};

export default Select;
