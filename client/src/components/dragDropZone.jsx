// https://react-dropzone.js.org/#!/Previews

import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import '../css/dragDropZone.css';

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    // marginTop: "-210px",
    marginBottom: 8,
    marginRight: 8,
    maxWidth: '100',
    height: '100%',
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
};

const img = {
    width: 'auto',
    height: '100%'
};


function DragDropZone({files, setFiles}) {
    let previewImage = useRef(null);
    let dropZoneDiv  = useRef(null);

    // const [ files, setFiles ] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
	accept: {
	    'image/*': []
	},
	multiple: false,
	onDrop: acceptedFiles => {
	    setFiles(acceptedFiles.map((file) => Object.assign(file, {
		preview: URL.createObjectURL(file),
	    })));
	}
    });
    
    const thumbs = files.map(file => (
	<div style={thumb} key={file.name} >
     	    <div style={thumbInner} >
     		<img src={ file.preview }
		     style={ img }
		     ref={ previewImage }
		     onLoad={() => { URL.revokeObjectURL(file.preview) }}
		/>
     	    </div>
     	</div>
    ));

    useEffect(() => {
	// Make sure to revoke the data uris to avoid memory leaks, will run on unmount
	return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    return (
	<section className="container" >
	    <div {...getRootProps({className: 'dropzone'})} ref={ dropZoneDiv }>
		<input {...getInputProps({className: 'dropzone-input'})}/>
		<p className="dropzone-text">Drag 'n' drop some files here, or click to select files</p>
	    </div>

	    <aside style={thumbsContainer} >
		{thumbs}
	    </aside>

	</section>
    );
}

export default DragDropZone;
