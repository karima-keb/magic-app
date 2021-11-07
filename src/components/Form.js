import React, { useState } from "react";
import "./Form.css";
import pates from "./../pates.json";
import viandes from "./../viande_tofu.json";
import complementsArray from "./../complements.json";
import saucesArray from "./../sauces.json";

function Form(props) {

    const [id, setId] = useState(1)
    const [type_pate, setType_pate] = useState("")
    const [viande_or_tofu, setViande_or_tofu] = useState("")
    const [complements, setComplements] = useState([])
    const [sauces, setSauces] = useState([])
    const [sauceNumberExceeded, setSauceNumberExceeded] = useState("")
    const [quantity, setQuantity] = useState("")

    const { onSubmit } = props

    const handleSubmit = event => {
        event.preventDefault()

        const type_pate_obj = pates.find(pate => pate.id === type_pate)
        const viande_or_tofu_obj = viandes.find(viande => viande.id === viande_or_tofu)
        const complements_array = complementsArray.filter(complement => complements.includes(complement.id))
        const sauces_array = saucesArray.filter(sauce => sauces.includes(sauce.id))

        let prix = 0;

        prix = prix + type_pate_obj.prix;
        prix = prix + viande_or_tofu_obj.prix;

        complements_array.map(complement => prix = prix + complement.prix)
        sauces_array.map(sauce => prix = prix + sauce.prix)

        onSubmit({
            id ,
            type_pate : type_pate_obj ,
            viande_or_tofu : viande_or_tofu_obj , 
            complements: complements_array, 
            sauces: sauces_array, 
            quantity,
            prix
        })

        setId(id+1)
        setType_pate("")
        setViande_or_tofu("")
        setComplements([])
        setSauces([])
        setQuantity("")
      }

    const handleOnChangeComplements = (complement) => {
        let copyComplements = [...complements]

        const fetchedComplement = copyComplements.find(item => item === complement)
        
        if(fetchedComplement) {
            copyComplements = copyComplements.filter(item => item !== fetchedComplement)
        } else {
            copyComplements.push(complement)
        }

        setComplements(copyComplements)
    }

    const handleChangeSauce = (sauce) => {

        let copySauces = [...sauces]

        const fetchedSauces = copySauces.find(item => item === sauce)

        if(fetchedSauces) {
            copySauces = copySauces.filter(item => item !== fetchedSauces)
        } else {
            copySauces.push(sauce)
        }

        if (copySauces.length > 2) {
            setSauceNumberExceeded("Vous devez sélectionner que 2 sauces!")  
            setSauces([])     
        } else {
            setSauceNumberExceeded('') 
            setSauces(copySauces)
        }
    }

    const patesInputList = pates.map(pate => (
        <span key={pate.id}>
            <input type="radio" required name="type_pate" checked={type_pate === pate.id} 
                    onChange={e => setType_pate(e.target.value)} value={pate.id} /> 
                    {pate.name} 
        </span>
    ))

    const viandesInputList = viandes.map(viande => (
        <span key={viande.id}>
            <input type="radio" required name="viande_or_tofu" checked={viande_or_tofu === viande.id} 
                    onChange={e => setViande_or_tofu(e.target.value)} value={viande.id} /> 
                    {viande.name} 
        </span>
    ))

    const complementsList = complementsArray.map(complement => (
        <span key={complement.id}>
            <input type="checkbox" name="complements" checked={complements.includes(complement.id)} 
                    onChange={e => handleOnChangeComplements(e.target.value)} value={complement.id} /> 
                    {complement.name} 
        </span>
    ))

    const saucesList = saucesArray.map(sauce => (
        <span key={sauce.id}>
            <input type="checkbox" name="sauces" checked={sauces.includes(sauce.id)} 
                    onChange={e => handleChangeSauce(e.target.value)} value={sauce.id} /> 
                    {sauce.name} 
        </span>
    ))
  
    return (
        <form className="form" onSubmit={handleSubmit}>
            <div>
                <label>Choisir le type du pâte * :</label> 
                {patesInputList}
            </div>
            <br/>
            <div>
                <label>Plutôt viande ou tofu * :</label>
                {viandesInputList}
             </div>
            <br/>
            <div>
                <label>Compléments :</label>
                {complementsList}
            </div>
            <br/>
            <div>
                <label>Sauces (Sélectionner max 2) *:</label>
                {saucesList}
                <div className="error">{ sauceNumberExceeded }</div>
            </div>
            <br/>

            <div>
                <label>Quantité * : </label>
                <input type="number" min="1" required value={quantity} onChange={e => setQuantity(e.target.value)} />
            </div>

            <br />

            <div>
                <button type="submit" disabled={sauceNumberExceeded !== '' || sauces.length === 0 }>Ajouter au panier</button>
            </div>

        </form>
    )
    
}

export default Form;