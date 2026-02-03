"use client";
import { useChangeStatusNurseryMutation, useDeleteNurseryMutation, useNurseryIndexQuery } from '@/redux/rtk/studentNursery'
import { Pagination, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Link from 'next/link'
import React, { useState } from 'react'
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa'

export default function StudentNursery() {
  const [search,setSearch] = useState("");
  const [page,setPage] = useState(1);
  const {data} =  useNurseryIndexQuery({search,page});
  const [deleteModal,setDeleteModal] = useState(false);
  const [selectedId,setSelectedId] = useState(null);
  const response = data?.data;
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const [deleteNursery] = useDeleteNurseryMutation();
  const [changeStatusNursery] = useChangeStatusNurseryMutation();
  const handleDeleteNursery = (id:any)=>{
    setSelectedId(id);
    setDeleteModal(true);
  };
  const confirmDelete = async () => {
    try {
      await deleteNursery(selectedId).unwrap();
      setDeleteModal(false);
      setSelectedId(null);
    } catch(e) {
      console.error('Delete failed:', e);
      setDeleteModal(false);
    }
  };
  const handleChangeStatus = async (id:any) => {
    try {
      // Add your API call here for updating status
      await changeStatusNursery(id).unwrap();
      // await updateNurseryStatus(id, newStatus).unwrap();
    } catch(e) {
      console.error('Status update failed:', e);
    }
  };
  return (
    <div>

        
      <div className='mb-4 flex justify-between items-center'>
        <h1 className='text-2xl font-bold mb-4'>Student Nursery</h1>
        <input 
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className='p-2 border rounded-lg'
        placeholder='Search'
        />
        <Link href={"add"} className='btn btn-primary'>
          Add
        </Link>
      </div>
      {/* Table */}
      <div className={`overflow-x-auto `}>
        <table className="min-w-full">
          <thead>
              <tr>
                <th className="px-4 py-2 text-start text-sm ">User ID</th>
                <th className="px-4 py-2 text-start text-sm ">Name</th>
                <th className="px-4 py-2 text-start text-sm ">Code</th>
                <th className="px-4 py-2 text-start text-sm ">Actions</th>
              </tr>
          </thead>
          <tbody>
            {response?.data?.map((row:any) => (
              <tr
              key={row?.id}
              className="border-b last:border-none hover:bg-gray-50 font-semibold"
              >
              <td className="px-4 py-2 text-sm text-gray-700">
                <div className='flex gap-2 items-center '>
                  <span>{row?.user_id}</span>
                </div>
                
                
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">{row.student_name}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{row.code}</td>

              <td className="px-4 py-2 flex space-x-2 gap-2 items-center">
                  <Link
                  href={`edit/${row.id}`}
                  className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
                  title="Edit"
                  >
                  <FaEdit />
                  </Link>
                  <button
                  className="p-2 rounded-md text-2xl"
                  title="Change Status"
                  onClick={()=>handleChangeStatus(row.id)}
                  >
                    {
                      row?.is_active ? <FaToggleOn className={'text-green-600'}/> :
                      <FaToggleOff className={'text-gray-400' }/>
                    }
                  
                  </button>
                  <button
                  className="p-2 rounded-md bg-red-100 hover:bg-red-200"
                  title="Delete"
                  onClick={()=>handleDeleteNursery(row.id)}
                  >
                  <FaTrash className='text-statusError'/>
                  </button>
              </td>
              </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className='flex justify-center mt-4'>
        <Pagination
          count={response?.total_pages || 1}
          page={page}
          onChange={handleChange}
          color="secondary"
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteModal} onClose={() => setDeleteModal(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this nursery record? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}
