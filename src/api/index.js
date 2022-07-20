export const getVehicleTypes = async () => {
  try {
    const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablevalueslist/vehicle type?format=json`)
    const data = await response.json()

    const results = await data.Results
    return results
  } catch (error) {
    console.log(error)
  }
}


export const getMakesForVehicleType = async (type) => {
  try {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/${type.trim()}?format=json`
    );
    const data = await response.json()
    const results = await data.Results
    return results
  } catch (error) {
    console.log(error)
  }
}


export const getModelsByMakeTypeYear = async (makeId, year="", type) => {
  try {
    if (year) {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}/vehicleType/${type}?format=json`
    );
    const data = await response.json()
    const results = await data.Results
    return results
    } else {
       const response = await fetch(
         `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/vehicleType/${type}?format=json`
       );
       const data = await response.json();
       const results = await data.Results;
       return results;
    }
  } catch (error) {
    console.log(error)
  }
}