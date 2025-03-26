import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const EditPartner = () => {

    const dispatch = useDispatch();
   const { id} = useParams();

   useEffect(()=> {
    dispatch(getSinglePartner(id));
   }, [dispatch, id]);

   console.log("Meri ID", id)
  return (
    <div className=''>

    </div>
  )
}

export default EditPartner