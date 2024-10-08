'use client';
import * as React from 'react';
import { renameIphoneImagesWithMeta } from '../actions/actions';
const { useState } = React;

export default function Home() {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  return (
    <div>
      <h1>Rename Iphone Images With Meta</h1>
      <div className='pt-10 videos'>
        <form action='' id='files-form'>
          <h2>Upload Video Files</h2>
          <input
            type='file'
            name='image'
            id='image'
            required
            multiple
            accept='image/*'
          />

          <div>
            <button
              id='start'
              type='submit'
              onClick={(e) => {
                e.preventDefault();
                setIsCompleted(false);
                const form = document.getElementById(
                  'files-form'
                ) as HTMLFormElement;
                const formData = new FormData(form);
                renameIphoneImagesWithMeta(formData).then((res) => {
                  if (res?.isCompleted) {
                    setIsCompleted(true);
                  }
                });
              }}
            >
              start
            </button>
          </div>
        </form>
      </div>
      {isCompleted ? (
        <div className='progress'>all video files are compressed</div>
      ) : null}
    </div>
  );
}
