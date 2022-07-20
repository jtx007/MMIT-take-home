import { useEffect, useState, useContext } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Checkbox,
  NumberInput,
  NumberInputField,
  Select,
  Button,
} from "@chakra-ui/react";

import { PrevFormContext } from "../context/formContext";

import {
  getVehicleTypes,
  getMakesForVehicleType,
  getModelsByMakeTypeYear,
} from "../api/index";
import ResultsTable from "./ResultsTable";

const SearchForm = () => {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [selectVehicleMake, setSelectedVehicleMake] = useState("");
  const [vehicleMakes, setVehicleMakes] = useState([]);
  const [toggleYear, setToggleYear] = useState(false);
  const [year, setYear] = useState('')
  const [loadingState, setLoadingState] = useState(false);
  const [vehicleSearchResults, setVehicleSearchResults] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const data = await getVehicleTypes();
      setVehicleTypes(data);
    };
    fetchData();
  }, []);

  const handleSelectedVehicleType = async (e) => {
      setVehicleMakes([]);
      setSelectedVehicleMake('')
      setSelectedVehicleType(e.target.value);
      const data = await getMakesForVehicleType(e.target.value);
      setVehicleMakes(data);
  };

  const handleSelectedVehicleMake =  (e) => {
    setSelectedVehicleMake(e.target.value);
  };

  const handleToggleYear = (e) => {
    e.preventDefault();
    setToggleYear(!toggleYear);
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault(e)
    setLoadingState(true);
    if (year && year.length !== 4) {
      setLoadingState(false)
      return
    }
    if (JSON.stringify(prevFormContext.prevFormData) === JSON.stringify({make: selectVehicleMake, year: year, type: selectedVehicleType})) return
    const data = await getModelsByMakeTypeYear(selectVehicleMake, year, selectedVehicleType)
    setVehicleSearchResults(data)
    prevFormContext.setPreviousFormData({
      make: selectVehicleMake,
      year: year,
      type: selectedVehicleType,
    });
    setLoadingState(false)
  };

  const prevFormContext = useContext(PrevFormContext);


  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Checkbox onChange={(e) => handleToggleYear(e)} colorScheme="green">
            Toggle Year
          </Checkbox>
        </FormControl>
        <FormControl>
          {toggleYear && (
            <FormControl isInvalid={year && year.length !== 4}>
              <FormLabel>Enter Year</FormLabel>
              <NumberInput>
                <NumberInputField onChange={(e) => setYear(e.target.value)} required />
              </NumberInput>
              <FormErrorMessage>Please enter a valid year</FormErrorMessage>
            </FormControl>
          )}
          <FormLabel>Select Vehicle Type</FormLabel>
          <Select
            required
            onChange={(e) => handleSelectedVehicleType(e)}
            placeholder="Select Vehicle Type"
          >
            {vehicleTypes &&
              vehicleTypes.map((type) => (
                <option value={type.Name} key={type.Id}>
                  {type.Name}
                </option>
              ))}
          </Select>
          <FormErrorMessage>Please select a vehicle type</FormErrorMessage>
        </FormControl>
        <FormControl>
          {vehicleMakes && (
            <>
              <FormLabel>{`Select ${selectedVehicleType} Make`}</FormLabel>
              <Select
                required
                onChange={(e) => handleSelectedVehicleMake(e)}
                placeholder={`Select ${selectedVehicleType} Make`}
              >
                {vehicleMakes.map((make) => (
                  <option value={make.MakeId} key={make.MakeId}>
                    {make.MakeName}
                  </option>
                ))}
              </Select>
            </>
          )}
          <FormErrorMessage>Please select a vehicle make</FormErrorMessage>
        </FormControl>
        <FormControl>
          <Button loadingText='Searching' isLoading={loadingState} type="submit"  colorScheme="green">Search</Button>
        </FormControl>
      </form>

      <ResultsTable results={vehicleSearchResults} />
    </>
  );
};

export default SearchForm;
