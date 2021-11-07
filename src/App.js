import React from 'react';
import './App.css';
import Form from './components/Form';
import NavBar from './components/NavBar'
import Panier from './components/Panier';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      kebabs: [],
    }
  }

  addKebab = kebab => {
    const { kebabs } = this.state
    const newKebabs = [...kebabs, kebab]
    this.setState({ 
      kebabs: newKebabs
    })
  }

  deleteKebab = id => {
    let confirm = window.confirm("Etes vous sûr de supprimer ce kebab ?")
    if (confirm) {
      const { kebabs } = this.state
      const newKebabs = kebabs.filter(kebab => kebab.id !== id)
      this.setState({ kebabs: newKebabs })
    }
  }

  passerCommande = () => {
    this.setState({ kebabs: [] })
    alert("C'est parti ! ... Notre maitre kébabier prépare votre commande. Patience...")
  }

  updateQuantity = (id, e) => {
    const { kebabs } = this.state
    const newKebabs = kebabs.map(k => {
        if (k.id === id) {
            k.quantity = e.target.value
        }
        return k;
    });
    
    this.setState({ kebabs: newKebabs })
  }

  render() {
    return (
      <div className="App container">
        <NavBar />
  
        <Form onSubmit={this.addKebab} />
      
        { this.state.kebabs.length > 0 ? 
          <div>
            <Panier kebabs={this.state.kebabs} deleteKebab={this.deleteKebab} updateQuantity={this.updateQuantity} /> 
            <button onClick={this.passerCommande}>Passer la commande</button>
          </div>
          : ''}
      </div>
    );
  }
}

export default App;