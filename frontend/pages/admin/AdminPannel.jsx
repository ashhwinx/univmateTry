import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const AdminPanel = () => {
  const [section, setSection] = useState('A');
  const [contentType, setContentType] = useState('classnotes');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [subjects, setSubjects] = useState([]);

  const [editingUnit, setEditingUnit] = useState(null);
  const [editedData, setEditedData] = useState({ name: '', driveLink: '' });

  const contentTypes = [
    { value: 'classnotes', label: 'Class Notes' },
    { value: 'pyq', label: 'Previous Year Questions' },
    { value: 'assignments', label: 'Assignments' },
    { value: 'labwork', label: 'Lab Work' },
    { value: 'resources', label: 'Additional Resources' }
  ];

  useEffect(() => {
    fetchSubjects();
  }, [section, contentType]);

  const fetchSubjects = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/materials/${section}/${contentType}`);
      setSubjects(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (subjectId, unitIndex, name, driveLink) => {
    setEditingUnit({ subjectId, unitIndex });
    setEditedData({ name, driveLink });
  };

  const handleSave = async () => {
    if (!editingUnit) return;
    try {
      await axios.put(`http://localhost:4000/api/materials/update-unit/${editingUnit.subjectId}`, {
        subjectId: editingUnit.subjectId,
        unitIndex: editingUnit.unitIndex,
        newName: editedData.name,
        newLink: editedData.driveLink
      });

      fetchSubjects();
      setEditingUnit(null);
      setEditedData({ name: '', driveLink: '' });
    } catch (error) {
      console.error("Failed to update:", error);
      alert("Update failed. See console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <motion.h1 
        className="text-4xl font-bold text-center mb-8 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Admin Dashboard
      </motion.h1>

      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <div className="filter-group">
          <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
          <select 
            value={section} 
            onChange={e => setSection(e.target.value)}
            className="px-4 py-2 rounded-lg shadow-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="A">Section A</option>
            <option value="B">Section B</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
          <select 
            value={contentType}
            onChange={e => setContentType(e.target.value)}
            className="px-4 py-2 rounded-lg shadow-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            {contentTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
          <select 
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
            className="px-4 py-2 rounded-lg shadow-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="all">All Subjects</option>
            {subjects.map(subject => (
              <option key={subject._id} value={subject._id}>{subject.subjectName}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-lg">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <th className="px-6 py-3">Subject</th>
              <th className="px-6 py-3">Unit</th>
              <th className="px-6 py-3">Drive Link</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects
              .filter(subject => selectedSubject === 'all' || subject._id === selectedSubject)
              .map(subject => (
                subject.units.map((unit, index) => (
                  <motion.tr 
                    key={subject._id + index} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">{subject.subjectName}</td>
                    <td className="px-6 py-4">
                      {editingUnit && editingUnit.subjectId === subject._id && editingUnit.unitIndex === index ? (
                        <input 
                          type="text" 
                          value={editedData.name} 
                          onChange={e => setEditedData({ ...editedData, name: e.target.value })} 
                          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      ) : (
                        unit.name
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingUnit && editingUnit.subjectId === subject._id && editingUnit.unitIndex === index ? (
                        <input 
                          type="text" 
                          value={editedData.driveLink} 
                          onChange={e => setEditedData({ ...editedData, driveLink: e.target.value })} 
                          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      ) : (
                        <a href={unit.driveLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">
                          View Material
                        </a>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingUnit && editingUnit.subjectId === subject._id && editingUnit.unitIndex === index ? (
                        <button 
                          onClick={handleSave} 
                          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                        >
                          Save
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleEdit(subject._id, index, unit.name, unit.driveLink)} 
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
