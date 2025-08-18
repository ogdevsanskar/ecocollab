// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title ClimateDataStorage
 * @dev Store and retrieve climate data on the blockchain
 */
contract ClimateDataStorage {
    struct ClimateData {
        string location;
        uint256 temperature; // Temperature * 100 (to handle decimals)
        uint256 humidity;    // Humidity * 100 (to handle decimals)
        uint256 timestamp;
        address submitter;
    }
    
    ClimateData[] public climateRecords;
    
    event ClimateDataStored(
        uint256 indexed index,
        string location,
        uint256 temperature,
        uint256 humidity,
        uint256 timestamp,
        address submitter
    );
    
    /**
     * @dev Store climate data on the blockchain
     * @param location The location where data was collected
     * @param temperature Temperature reading (multiplied by 100)
     * @param humidity Humidity reading (multiplied by 100)
     * @param timestamp Unix timestamp of the reading
     */
    function storeClimateData(
        string memory location,
        uint256 temperature,
        uint256 humidity,
        uint256 timestamp
    ) public {
        climateRecords.push(ClimateData({
            location: location,
            temperature: temperature,
            humidity: humidity,
            timestamp: timestamp,
            submitter: msg.sender
        }));
        
        uint256 index = climateRecords.length - 1;
        
        emit ClimateDataStored(
            index,
            location,
            temperature,
            humidity,
            timestamp,
            msg.sender
        );
    }
    
    /**
     * @dev Get climate data by index
     * @param index The index of the climate record
     * @return location, temperature, humidity, timestamp
     */
    function getClimateData(uint256 index) 
        public 
        view 
        returns (string memory, uint256, uint256, uint256) 
    {
        require(index < climateRecords.length, "Index out of bounds");
        ClimateData memory data = climateRecords[index];
        return (data.location, data.temperature, data.humidity, data.timestamp);
    }
    
    /**
     * @dev Get the total number of climate records
     * @return The count of stored climate records
     */
    function getClimateDataCount() public view returns (uint256) {
        return climateRecords.length;
    }
    
    /**
     * @dev Get climate data with submitter info
     * @param index The index of the climate record
     * @return All climate data including submitter address
     */
    function getClimateDataWithSubmitter(uint256 index) 
        public 
        view 
        returns (string memory, uint256, uint256, uint256, address) 
    {
        require(index < climateRecords.length, "Index out of bounds");
        ClimateData memory data = climateRecords[index];
        return (
            data.location, 
            data.temperature, 
            data.humidity, 
            data.timestamp, 
            data.submitter
        );
    }
}
