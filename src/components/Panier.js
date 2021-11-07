import React from "react";
import "./Panier.css"

function Panier(props) {
    const { kebabs, deleteKebab, updateQuantity } = props

    const kebabList = kebabs.map(kebab => (
        <tr key={kebab.id}>
            <td>
                <span className="ingredient">{kebab.type_pate.name}</span>
                <span className="ingredient">{kebab.viande_or_tofu.name}</span>
                {kebab.complements.map(comp => <span key={comp.id} className="ingredient">{comp.name}</span> )} 
                {kebab.sauces.map(sauce => <span key={sauce.id} className="ingredient">{sauce.name}</span> )} 
            </td>
            <td><span className="unitPrice">{kebab.prix} £</span></td>
            <td><input type="number" min="1" value={kebab.quantity} onChange={(e) => updateQuantity(kebab.id, e)}/></td>
            <td>
                <button className="button-danger" onClick={() => deleteKebab(kebab.id)} >Supprimer</button>
            </td>
        </tr>
      ))

      let prixTotal = 0;

      kebabs.map(kebab => prixTotal = prixTotal + kebab.prix * parseInt(kebab.quantity))

    return <div className="panier">
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Kebab</th>
                        <th>Prix</th>
                        <th>Quanité</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {kebabList}
                </tbody>
            </table>
            <div className="price">Prix total: {prixTotal} £</div>
        </div>;

}

export default Panier;