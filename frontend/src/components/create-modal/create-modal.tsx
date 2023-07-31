import { useEffect, useState } from "react";
import { useFoodDataMutate } from "../../hooks/useFoodDataMutate";
import { FoodData } from './../../interface/FoodData';
import "./create-modal.css"

interface InputProps {
  label: string,
  value: string | number,
  updateValue(value: any): void 
}

interface ModalProps{
  closeModal(): void
}


const Input = ({ label, value, updateValue}: InputProps) => { 
  return(
      <>
       <label> {label} </label>
       <input value={value} onChange={e => updateValue(e.target.value)} />
      </>
    )
  }

export function CreateModal({ closeModal }: ModalProps){
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const {mutate, isSuccess, isLoading} = useFoodDataMutate();

    const submit = () => {
      const FoodData: FoodData = {
        title: title,
        price: price,
        image: image
      }
      mutate(FoodData);
    }

    useEffect(() => {
      if(isSuccess){
        closeModal();
      }
    }, [isSuccess])

    return(
        <div className="modal-overlay">
          <div className="modal-body">
            <h2>Cadastre um novo item no cardápio</h2>
            <form action="" className="input-container">
              <Input value={title} label="title" updateValue={setTitle} />
              <Input value={price} label="price" updateValue={setPrice} />
            <Input value={image} label="image" updateValue={setImage} />
            </form>
            <button onClick={submit} className="btn-secondary">
              {isLoading ? 'postando...' : 'postar'}
            </button>
          </div>
        </div>
    )
}