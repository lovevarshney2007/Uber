import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState, useRef } from "react";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel,setVehiclePanel] = useState(false);
  const vehiclePanelRef = useRef(null);
  const panelRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();

    console.log({
      pickup,
      destination,
    });
  };

  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: panelOpen ? "75%" : "30%",
      duration: 0.4,
      ease: "power2.out",
    });
  }, [panelOpen]);

  useGSAP(function(){
   if(vehiclePanel){
    gsap.to(vehiclePanelRef.current, {
      transform: "translateY(0)",
      height: "75%",
      duration: 0.4,
      ease: "power2.out",
    }) 
   } else {
    gsap.to(vehiclePanelRef.current, {
      transform: "translateY(100%)",
      height: "0%",     
      duration: 0.4,
      ease: "power2.out",
    })
   }
  }, [vehiclePanel]);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Uber Logo */}
      <img
        className="w-16 absolute left-5 top-5 z-20"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="background"
        />
      </div>

      {/* Bottom Sheet */}
      <div
        ref={panelRef}
        className="absolute bottom-0 left-0 w-full bg-white rounded-t-3xl p-5 overflow-hidden z-10"
        style={{ height: "30%" }}
      >
        {/* Close Button */}
        {panelOpen && (
          <h5
            onClick={() => setPanelOpen(false)}
            className="absolute right-5 top-5 text-2xl cursor-pointer text-gray-500"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
        )}

        <h4 className="text-2xl font-semibold mb-5">
          Find a trip
        </h4>

        <form onSubmit={submitHandler}>
          {/* Vertical Line */}
          <div className="absolute h-10 w-1 left-9 top-[92px] bg-gray-800 rounded-full"></div>

          <input
            type="text"
            value={pickup}
            onClick={() => setPanelOpen(true)}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="Add a pick-up location"
            className="bg-[#eee] px-12 py-3 text-base rounded-lg w-full mb-3 outline-none"
          />

          <input
            type="text"
            value={destination}
            onClick={() => setPanelOpen(true)}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter your destination"
            className="bg-[#eee] px-12 py-3 text-base rounded-lg w-full outline-none"
          />
        </form>

        {/* Locations Panel */}
        {panelOpen && (
          <div className="mt-6">
            <LocationSearchPanel vehiclePanel={vehiclePanel} setVehiclePanel={setVehiclePanel} />
          </div>
        )}
      </div>

      <div ref={vehiclePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 mb-20 mt-10">
        <h3 className="text-lg font-medium mb-3">Choose a ride </h3>
        <div className="flex border-2 active:border-black bg-gray-100 rounded-xl w-full items-center p-3justify-between">
          <img className="h-12" src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85MDM0YzIwMC1jZTI5LTQ5ZjEtYmYzNS1lOWQyNTBlODIxN2EucG5n" alt="" />
          <div className=" w-1/2">
            <h4 className="text-lg font-medium">Uber Go <span><i className="ri-user-line"></i>4</span></h4>
            <h5 className="text-sm font-medium">2 Min Away</h5>
            <p className="text-xs font-medium text-gray-600">Affordable,compact rides</p>
          </div>
          <h2 className="text-xl font-semibold">Rs.199</h2>
        </div>

        <div className="flex border-2 border-black rounded-xl w-full items-center p-3justify-between mb-2 mt-2">
          <img className="h-10" src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85MjAwMTg5YS03MWMwLTRmNmQtYTlkZS0xYjZhODUyMzkwNzkucG5n" alt="" />
          <div className=" w-1/2">
            <h4 className="text-lg font-medium">Moto <span><i className="ri-user-line"></i>1</span></h4>
            <h5 className="text-sm font-medium">2 Min Away</h5>
            <p className="text-xs font-medium text-gray-600">Affordable,compact MotorCycle</p>
          </div>
          <h2 className="text-xl font-semibold">Rs. 70</h2>
        </div>

        <div className="flex border-2 border-black rounded-xl w-full items-center p-3justify-between">
          <img className="h-12" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMRyG_17bKVszyOE1vxUikjxMJ_PoUX4pxIQ&s" alt="" />
          <div className=" w-1/2">
            <h4 className="text-lg font-medium">Uber Auto <span><i className="ri-user-line"></i>6</span></h4>
            <h5 className="text-sm font-medium">2 Min Away</h5>
            <p className="text-xs font-medium text-gray-600">Affordable,Auto rides</p>
          </div>
          <h2 className="text-xl font-semibold">Rs.118.68</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;