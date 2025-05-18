import React, { useState, useEffect } from 'react';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const VehicleDashboard = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Normally we would fetch from an API, but we'll use the data we already have
        const vehicles = [
          {
            "id": "V001",
            "model": "Camry",
            "year": 2024,
            "color": "White",
            "vin": "JT12345XYZ67890",
            "status": "In Production",
            "plant": "Toyota Plant Aichi",
            "assembly_line": "Line 3",
            "createdAt": "2025-03-27T08:00:00Z",
          },
          {
            "id": "V002",
            "model": "Corolla",
            "year": 2024,
            "color": "Blue",
            "vin": "JT67890XYZ12345",
            "status": "Completed",
            "plant": "Toyota Plant Kentucky",
            "assembly_line": "Line 2",
            "createdAt": "2025-03-26T10:30:00Z",
          },
          {
            "id": "V003",
            "model": "RAV4",
            "year": 2025,
            "color": "Red",
            "vin": "JT11122ABC33344",
            "status": "Quality Check",
            "plant": "Toyota Plant Texas",
            "assembly_line": "Line 1",
            "createdAt": "2025-03-25T14:20:00Z",
          },
          {
            "id": "V004",
            "model": "Highlander",
            "year": 2025,
            "color": "Black",
            "vin": "JT55566DEF77788",
            "status": "In Production",
            "plant": "Toyota Plant Aichi",
            "assembly_line": "Line 4",
            "createdAt": "2025-03-27T09:15:00Z",
          },
          {
            "id": "V005",
            "model": "Tacoma",
            "year": 2024,
            "color": "Silver",
            "vin": "JT99900GHI11122",
            "status": "Awaiting Parts",
            "plant": "Toyota Plant Mexico",
            "assembly_line": "Line 2",
            "createdAt": "2025-03-24T16:45:00Z",
          },
          {
            "id": "V006",
            "model": "Supra",
            "year": 2025,
            "color": "Yellow",
            "vin": "JT22233JKL44455",
            "status": "Completed",
            "plant": "Toyota Plant Japan",
            "assembly_line": "Line 5",
            "createdAt": "2025-03-22T12:10:00Z",
          },
          {
            "id": "V007",
            "model": "Land Cruiser",
            "year": 2024,
            "color": "Green",
            "vin": "JT88877MNO66699",
            "status": "Shipped",
            "plant": "Toyota Plant South Africa",
            "assembly_line": "Line 3",
            "createdAt": "2025-03-21T18:30:00Z",
          }
        ];
        
        setVehicleData(vehicles);
        setLoading(false);
      } catch (err) {
        setError('Failed to load vehicle data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // Prepare data for status pie chart
  const prepareStatusData = () => {
    const statusCounts = {};
    vehicleData.forEach(vehicle => {
      statusCounts[vehicle.status] = (statusCounts[vehicle.status] || 0) + 1;
    });
    
    return Object.keys(statusCounts).map(status => ({
      name: status,
      value: statusCounts[status]
    }));
  };

  // Prepare data for plant bar chart
  const preparePlantData = () => {
    const plantCounts = {};
    vehicleData.forEach(vehicle => {
      plantCounts[vehicle.plant] = (plantCounts[vehicle.plant] || 0) + 1;
    });
    
    return Object.keys(plantCounts).map(plant => ({
      name: plant.replace('Toyota Plant ', ''),
      value: plantCounts[plant]
    }));
  };

  // Prepare data for model year breakdown
  const prepareYearData = () => {
    const yearCounts = {};
    vehicleData.forEach(vehicle => {
      yearCounts[vehicle.year] = (yearCounts[vehicle.year] || 0) + 1;
    });
    
    return Object.keys(yearCounts).map(year => ({
      name: year,
      value: yearCounts[year]
    }));
  };

  // Prepare data for color distribution
  const prepareColorData = () => {
    const colorCounts = {};
    vehicleData.forEach(vehicle => {
      colorCounts[vehicle.color] = (colorCounts[vehicle.color] || 0) + 1;
    });
    
    return Object.keys(colorCounts).map(color => ({
      name: color,
      value: colorCounts[color]
    }));
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#83a6ed', '#8dd1e1'];

  if (loading) return <div className="flex justify-center items-center h-screen">Loading dashboard...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  const statusData = prepareStatusData();
  const plantData = preparePlantData();
  const yearData = prepareYearData();
  const colorData = prepareColorData();

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-8">Vehicle Production Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Status Distribution */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Production Status</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} vehicles`, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Plant Distribution */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Vehicles by Plant</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={plantData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip formatter={(value) => [`${value} vehicles`, 'Count']} />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Year Distribution */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Vehicles by Model Year</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={yearData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} vehicles`, 'Count']} />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Color Distribution */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Vehicle Colors</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={colorData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {colorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} vehicles`, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Vehicle Data Table */}
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Vehicle Inventory</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">ID</th>
                <th className="py-2 px-4 border-b text-left">Model</th>
                <th className="py-2 px-4 border-b text-left">Year</th>
                <th className="py-2 px-4 border-b text-left">Color</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
                <th className="py-2 px-4 border-b text-left">Plant</th>
                <th className="py-2 px-4 border-b text-left">Assembly Line</th>
              </tr>
            </thead>
            <tbody>
              {vehicleData.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{vehicle.id}</td>
                  <td className="py-2 px-4 border-b">{vehicle.model}</td>
                  <td className="py-2 px-4 border-b">{vehicle.year}</td>
                  <td className="py-2 px-4 border-b">{vehicle.color}</td>
                  <td className="py-2 px-4 border-b">{vehicle.status}</td>
                  <td className="py-2 px-4 border-b">{vehicle.plant}</td>
                  <td className="py-2 px-4 border-b">{vehicle.assembly_line}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Summary Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-700">Total Vehicles</h3>
            <p className="text-3xl font-bold">{vehicleData.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium text-green-700">Completed/Shipped</h3>
            <p className="text-3xl font-bold">
              {vehicleData.filter(v => v.status === "Completed" || v.status === "Shipped").length}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-medium text-yellow-700">In Progress</h3>
            <p className="text-3xl font-bold">
              {vehicleData.filter(v => v.status === "In Production" || v.status === "Quality Check" || v.status === "Awaiting Parts").length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDashboard;