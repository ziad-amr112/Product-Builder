import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import Modal from "./components/ui/Modal";
import ProductCard from "./components/ui/ProductCard";
import { colors, formInputsList, productList, categories } from "./data";
import { ChangeEvent, FormEvent, useState } from "react";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMsg from "./components/ui/ErrorMsg";
import CircleColor from "./components/ui/CircleColor";
import { v4 as uuid } from "uuid";
import Select from "./components/ui/Select";
import { TProductName } from "./types";
import toast,{Toaster} from 'react-hot-toast'

const App = () => {
  const defaultProductObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };

  /*------ STATE ------*/
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProductObj);
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);
  const [errors, setErrors] = useState({title: "",description: "",imageURL: "",price: "",colors: "",});
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  /*------ HANDLER ------*/
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const openEdit = () => setIsOpenEdit(true);
  const closeEdit = () => setIsOpenEdit(false);
  const closeConfirmModal = () => setIsOpenConfirmModal(false);
  const openConfirmModal = () => setIsOpenConfirmModal(true);


  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const onCancel = () => {
    setProduct(defaultProductObj);
    setTempColors([]);
    close();
  };


  const removeProductHandler = () => {
    const filtered = products.filter(product => product.id !== productToEdit.id);
    setProducts(filtered);
    closeConfirmModal();
    toast("Product has been deleted successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "#c2344d",
        color: "white",
      },
    });
  };


  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const errors = productValidation({
      title: product.title,
      description: product.description,
      price: product.price,
      imageURL: product.imageURL,
      colors: tempColors,
    });

    const hasErrorMsg = Object.values(errors).some((value) => value === "") && Object.values(errors).every((value) => value === "");

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    setProducts((prev) => [
      {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);
    setProduct(defaultProductObj);
    setTempColors([]);
    close();
    toast("Product has been Add successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "#000",
        color: "white",
      },
    });
  };
  const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, price, imageURL } = productToEdit;


    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
      colors:tempColors.concat(productToEdit.colors),
    });

    const hasErrorMsg =
    Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "");

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    const updatedProducts = [...products];
    updatedProducts[productToEditIdx] = {...productToEdit , colors:tempColors.concat(productToEdit.colors) };
    setProducts(updatedProducts);

    setProductToEdit(defaultProductObj);
    setTempColors([]);
    closeEdit();
    toast("Product has been edit successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "#000",
        color: "white",
      },
    });
  };

  /*------ RENDER ------*/
  const renderProductList = products.map((product, idx) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openEdit={openEdit}
      idx={idx}
      setProductToEditIdx={setProductToEditIdx}
      openConfirmModal={openConfirmModal}

    />
  ));
  const renderFormInputList = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label
        htmlFor={input.id}
        className="mb-[2px] text-sm font-medium text-gray-700"
      >
        {input.label}
      </label>
      <Input
        type="text"
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={onChangeHandler}
      />
      <ErrorMsg msg={errors[input.name]} />
    </div>
  ));
  const renderColorError = errors.colors ? (
    <ErrorMsg msg={errors.colors} />
  ) : null;
  const renderProductColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        if (productToEdit.colors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        if (errors.colors) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            colors: "",
          }));
        }
        setTempColors(prev => [...prev, color]);
      }}/>
  ));

  const renderProducEditWithErrorMsg = (
    id: string,
    label: string,
    name: TProductName
  ) => {
    return (
      <div className="flex flex-col">
        <label
          htmlFor={id}
          className="mb-[2px] text-sm font-medium text-gray-700">
          {label}
        </label>
        <Input
          type="text"
          id={id}
          name={name}
          value={productToEdit[name]}
          onChange={onChangeEditHandler}/>
        <ErrorMsg msg={errors[name]} />
      </div>
    );
  };

  return (
    <main className="container relative">
      <Button
        className="block bg-indigo-700 hover:bg-indigo-800 mx-auto my-10 px-10 font-medium"
        onClick={open}
        width="w-fit"
      >
        Build a Product
      </Button>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lx:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md ">
        {renderProductList}
      </div>
      {/*ADD PRODUCT MODAL */}
      <Modal isOpen={isOpen} close={close} title="Add A New Product">
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputList}

          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />

          <div className="flex items-center my-3 flex-wrap space-x-1">
            {renderProductColors}
          </div>
          {renderColorError}
          <div className="flex items-center my-3 flex-wrap space-x-1">
            {tempColors.map((color) => (
              <span
                key={color}
                className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <Button className=" bg-indigo-700 hover:bg-indigo-800 ">
              Submit{" "}
            </Button>
            <Button type="button" className="bg-[#f5f5fa] hover:bg-gray-300 !text-black" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/*EDIT PRODUCT MODAL */}
      <Modal  isOpen={isOpenEdit} close={closeEdit} title="Edit This Product">
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderProducEditWithErrorMsg("title", "Product Title", "title")}
          {renderProducEditWithErrorMsg(
            "description",
            "Product Description",
            "description"
          )}
          {renderProducEditWithErrorMsg(
            "imageURL",
            "Product ImageURL",
            "imageURL"
          )}
          {renderProducEditWithErrorMsg("price", "Product Price", "price")}

          <Select selected={productToEdit.category}setSelected={value=> setProductToEdit({...productToEdit , category: value})}/>

          <div className="flex items-center my-3 flex-wrap space-x-1">
            {renderProductColors}
          </div>
          {renderColorError}
          <div className="flex items-center my-3 flex-wrap space-x-1">
            {tempColors.concat(productToEdit.colors).map((color) => (
              <span
                key={color}
                className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                style={{ backgroundColor: color }}>
                {color}
              </span>))}
          </div>


          <div className="flex items-center space-x-3">
            <Button className=" bg-indigo-700 hover:bg-indigo-800 ">
              Submit{" "}
            </Button>
            <Button type="button" className="bg-[#f5f5fa] hover:bg-gray-300 !text-black" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
        {/* DELETE PRODUCT CONFIRM MODAL */}
        <Modal
        isOpen={isOpenConfirmModal}
        close={closeConfirmModal}
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button className="bg-[#c2344d] hover:bg-red-800" onClick={removeProductHandler}>
            Yes, remove
          </Button>
          <Button type="button" className="bg-[#f5f5fa] hover:bg-gray-300 !text-black" onClick={closeConfirmModal}>
            Cancel
          </Button>
        </div>
      </Modal>
      <Toaster/>
    </main>
  );
};

export default App;
