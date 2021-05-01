import React, { useState } from 'react'

export const AddBand = ({addBand}) => {
    const [handleTextBand, setHandleTextBand] = useState('')
    
    const handleAddBand=(e)=>{
        e.preventDefault();
        const newbandName= e.target.value
        setHandleTextBand(newbandName);
    }

    const onSubmitBand=(e)=>{
        e.preventDefault();
        if(handleTextBand===''){
            return
        }
        addBand(handleTextBand.trim())
        setHandleTextBand('')
    }

    return (
        <>
          <h3>Add Band</h3>
            <form onSubmit={onSubmitBand}>
                <input
                className="form-control"
                placeholder="new band"
                onChange={handleAddBand}
                value={handleTextBand}
                />
                <input 
                className="btn btn-primary mt-2 block"
                type="submit"
                />
                
            
            </form>  
        </>
    )
}
