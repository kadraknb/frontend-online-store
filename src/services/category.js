import React from "react";
import { getCategories } from "./api";

class Categoria extends React.Component {
    constructor() {
        super();

        this.state = {
            categories: [],
        };
    }
        componentDidMount() {
            this.fechGetCategories()
        }

        fechGetCategories = async () => {
            const dado = await getCategories()
            this.setState({categories: dado })
        }
   
    render() {
        const { categories } = this.state
        return(
            <>
                { categories.map((aa) => (
                  <label htmlFor={aa.id} key={aa.id} data-testid='category'>
                   <input type="radio" name={aa.id} value={aa.name}/>
                   {aa.name}
                  </label>
                )) }
            </>
            
        )
    }
}

export default Categoria 
