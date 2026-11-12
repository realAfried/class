function Input(props) {

    function handleSubmit(e){
        e.preventDefault();

        const table= {
            street : e.target.street.value,
            city : e.target.city.value,
            states : e.target.states.value,
            zip : e.target.zip.value,
        }
        props.onSave(table);
    }
    


  return (
    <>
     <form onSubmit={handleSubmit}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street"/>
        <label htmlFor="city">City</label>
        <input type="text"  id="city"/>
        <label htmlFor="states">State</label>
        <input type="text" id="states" />
        <label htmlFor="zip">Zip</label>
        <input type="text" id="zip" />
        <button>Click me</button>
     </form>
    </>
  )
}

export default Input