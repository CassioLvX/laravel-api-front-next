'use client'

import {  useState } from 'react';
import useProtectedRoute from '@/app/hooks/useProtectedRoute';
import { createProduct } from '@/app/services/requestService';
import { PhotoIcon } from '@heroicons/react/24/solid';


export default function Create() {
  const [error, setError] = useState<string | null>(null); 

  useProtectedRoute();
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (!['image/png', 'image/jpeg'].includes(file.type)) {
        alert('Please upload a PNG or JPEG image.');
        event.target.value = '';
        return;
    }

    if (!file) return;
  
    const maxSize = 1 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('The file must be smaller than 1MB.');
      event.target.value = '';
    }
  };

  const handleUpdateProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const description = form.description.value;
    const price = form.price.value;
    const image = form['file-upload'].files?.[0];

    if (!image) {
      setError('Please upload a product image.');
      return;
    }

    if (!name || !description || isNaN(price)) {
      setError('Please fill in all fields correctly.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('image_path', image);

    try {
        const response = await createProduct(formData);
        setError(null);
        window.location.href = '/panel/products';
    } catch (error) {
        setError('An error occurred while updating the product. ' + error);
    }
  };

  return (
    <form onSubmit={handleUpdateProduct}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Update product</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    minLength={3}
                    required
                    placeholder="name"
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">
                Price
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0.01"
                    step="0.01"
                    required
                    placeholder="price"
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                  <div className="mt-4 flex text-sm/6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".png,.jpeg" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 text-gray-600">PNG, JPEG up to 1MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && <div className="text-red-600">{error}</div>}

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
