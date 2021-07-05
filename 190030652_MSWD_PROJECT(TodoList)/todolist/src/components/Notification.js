
import React, { useState,useEffect } from 'react'


const Notification=({message})=>
{
if(message!==null){
    return (
        <div>
            <div class="alert alert-danger d-flex align-items-center" role="alert">
  <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use /></svg>
  <div>
    An example danger alert with an icon{message}
  </div>
</div>
        </div>
    )
}
}

export default Notification