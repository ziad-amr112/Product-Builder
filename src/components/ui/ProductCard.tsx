import Image from "./Image";
import Button from "./Button";
import { IProduct } from "../../interfaces";
import {numberWithCommas, txtSlicer } from "../../utils/functions";
import CircleColor from "./CircleColor";


interface IProps {
  product : IProduct
  setProductToEdit: (product:IProduct) => void
  openEdit: () => void
  idx:number;
  setProductToEditIdx:(value:number)=> void
  openConfirmModal: () => void;

}

const ProductCard = ({product , setProductToEdit, idx,setProductToEditIdx, openEdit,openConfirmModal}: IProps) => {
  const {title , description ,  imageURL , colors, price , category}=product;

  /*------ RENDER ------*/
  const renderProductColors=colors.map(color => <CircleColor key={color} color={color}/>)
   
  /*------ HANDLER ------*/
const onEdit = () =>{
  setProductToEdit(product)
  openEdit()
  setProductToEditIdx(idx)
}
const onRemove = () => {
  setProductToEdit(product);
  openConfirmModal();
};

  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col">
      <Image imageURL={imageURL} alt={"Product Name"} className="rounded-md mb-2 h-52 w-full lg:object-cover" />

      <h3 className="text-lg font-semibold">{txtSlicer(title,25)}</h3>
      <p className="text-sm text-gray-500 break-words">
       {txtSlicer(description)}
      </p>

      <div className="flex items-center my-3 flex-wrap space-x-1">{renderProductColors}</div>

      <div className="flex items-center justify-between">
        <span className="text-lg text-indigo-600 font-semibold">${numberWithCommas(price)}</span>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold">{category.name}</span>
          <Image imageURL={category.imageURL} alt={category.name} className="w-10 h-10 rounded-full object-bottom" />
        </div>
      </div>

        <div className="flex items-center justify-between space-x-2">
          <Button  className="bg-indigo-700 hover:bg-indigo-800" onClick={onEdit}>EDIT</Button>
          <Button className="bg-[#c2344d] hover:bg-red-800" onClick={onRemove}>DELETE</Button>
        </div>
    </div>
  );
};

export default ProductCard;
