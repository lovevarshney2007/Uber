import React from 'react'

const LocationSearchPanel = (props) => {
console.log(props);


  // sample array for location 

  const location = [
      "Gopal Mohalla,Kalki Mandir",
      "Ghanta Ghar sharma cafe",
      "Bada bajar near love house ",
      "sample location samjh nhi aa raha"
  ]

  return (
    <div>
      {/* This is just a sample data for now */}

    {
      location.map(function(elem){
         return (
          <div onClick={() => {
            props.setVehiclePanel(true)
          }} className="flex gap-4 border-2 p-3 border-gray-100 active:border-black rounded-xl items-center my-2 justify-start">
            <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center'><i className="ri-map-pin-fill"></i></h2>
            <h4 className='font-medium'>{elem}</h4>
          </div>
         )
      })
    }

      
      
     
      
    </div>
  )
}


export default LocationSearchPanel;