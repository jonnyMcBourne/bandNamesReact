import React, { useEffect, useState } from 'react'

export const BandList = ({data,vote,deleteBand}) => {

    const [bands, setBands] = useState(data);

    useEffect(() => {setBands(data)}, [data]);

    const onChangeNameBand =(e,id)=>{
        let newname=e.target.value
        
        setBands(bands=>bands.map(band=>{
            if(band.id===id){
                band.name=newname;
            }
            return band
        }))
    }

    const onDeleteBand=(id)=>{
        deleteBand(id)
    }
 
    const createRows=()=>{
        return(
            bands.map(band=>(
        <tr key={band.id}>
            <td> <button className=" btn btn-primary " onClick={()=>{vote(band.id)}} > +1 </button> </td>
            <td> <input className= "form-control" name="bandName" value={band.name}  onChange={(e)=>onChangeNameBand(e,band.id)} /></td>
            <td><h3>{band.votes}</h3> </td>
            <td><button className=" btn btn-danger " onClick={()=>{onDeleteBand(band.id)}}  > Detele </button></td>
        </tr>
        )))
    }

    return (
     
            <>
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Band</th>
                        <th>Votes</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {createRows()}
                </tbody>
            </table>
        </>
        
    )
}
