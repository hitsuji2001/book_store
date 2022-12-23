import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Form } from 'semantic-ui-react';
import DragDropZone from './dragDropZone.jsx';
import '../css/bookDetails.css';

export default function BookDetails(props) {
    const [ book, setBook ] = useState({});
    const [ files, setFiles ] = useState([]);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
	const formData = new FormData();
	formData.append('book', JSON.stringify(data));
	formData.append('image', files[0]);
	setBook(data);

	await fetch(`/api/books/addBook`, { method: 'POST', body: formData })
	    .then((res) => { res.json() })
	    .then((res) => { navigate('/') });
    }

    useEffect(() => {
	if (props.action !== 'add') {
	    const id = window.location.href.split('/')[5];
	    fetch(`/api/books/getBook/${id}`)
		.then((res) => res.json())
		.then((data) => {
		    setBook(data)
		    console.log('book:', data);
		})
		.catch((err) => {
		    console.error('ERROR in fetching data: ', err.message);
		});
	}
    }, []);

    const handleCoverImage = (name) => {
	if (name !== '' && name !== undefined) return `/api/books/getImage/${name}`;
	else return '../../default-cover.jpg';
    }
    
    let actionButton;
    let coverImage;
    let dragDropZone;

    if (props.action === 'view') {
	actionButton = <Link to={`/book/edit/${book.id}`}><div className="btn btn-primary m-1">Edit</div></Link>;
	if (book.cover_image !== '') coverImage = <img src={ handleCoverImage(book.cover_image) } alt="Book's Cover" />;
	else coverImage = '';
    }
    else if (props.action === 'edit') {
	actionButton = (
	    <>
		<input type="submit" className="btn btn-primary m-1" value="Submit"/>
		<Link to={`/book/view/${book.id}`}><div className="btn btn-primary m-1">View</div></Link>
	    </>
	);
	if (book.cover_image !== '') coverImage = <img src={ handleCoverImage(book.cover_image) } alt="Book's Cover" />;
	else coverImage = '';
    } else if (props.action === 'add') {
	actionButton = <input type="submit" className="btn btn-primary m-1" value="Submit"/>
	dragDropZone = <DragDropZone
			   files={files}
			   setFiles={setFiles}
		       />;
    }

    return (
	<div className="detail-container">
	    <Form className="form" onSubmit={ handleSubmit(onSubmit) }>
		<div className="form-container">
		 
		    <Form.Field className="input-group mb-3">
			<div className="input-group-prepend">
			    <span className="input-group-text">Tên sách</span>
			</div>
			<input type="text" className="form-control"
			       name="title"
			       value={ book.title }
			       {...register("title", { required: true, maxLength: 30 })}
			/>
		    </Form.Field>
		    {errors.title && <p className="error-messages alert alert-danger"><i className="fi fi-rr-exclamation"></i> Title is required!</p>}

		    <Form.Field className="input-group mb-3">
			<div className="input-group-prepend">
			    <span className="input-group-text">Tác giả</span>
			</div>
			<input type="text" className="form-control"
			       name="author"
			       value={ book.author }
			       {...register("author", { required: true, maxLength: 20 })}
			></input>
		    </Form.Field>
		    {errors.author && <p className="error-messages alert alert-danger"><i className="fi fi-rr-exclamation"></i> Author is required!</p>}

		    <Form.Field className="input-group mb-3">
			<span className="input-group-text">Mô tả</span>
			<textarea className="form-control"
				  rows="5"
				  name="description"
				  defaultValue={ book.description }
				  {...register("description")}
				 ></textarea>
		    </Form.Field>

		    <Form.Field className="input-group mb-3">
			<div className="input-group-prepend">
			    <span className="input-group-text">Ngày phát hành</span>
			</div>
			<input type="date"
			       className="form-control"
			       name="release_date"
			       value={ book.release_date }
			       {...register("release_date")}
			></input>
		    </Form.Field>

		    <div className="d-sm-flex">
			<Form.Field className="input-group mb-3">
			    <div className="input-group-prepend">
				<span className="input-group-text">Số trang</span>
			    </div>
			    <input type="number"
				   className="form-control"
				   name="pages"
				   value={ book.pages }
				   {...register("pages", { min: 0 })}
			    ></input>
			</Form.Field>

			<Form.Field className="input-group mb-3">
			    <div className="input-group-prepend">
				<span className="input-group-text">Thể loại</span>
			    </div>
			    <select value={ book.category }
				    name="category"
				    {...register("category")}
				    className="form-control">
				<option value="law">Chính trị – pháp luật</option>
				<option value="science">Khoa học công nghệ – Kinh tế</option>
				<option value="literature">Văn học nghệ thuật</option>
				<option value="history">Văn hóa xã hội – Lịch sử</option>
				<option value="novel">Truyện, tiểu thuyết</option>
				<option value="politic">Tâm lý, tâm linh, tôn giáo</option>
				<option value="teenage">Thiếu nhi</option>
				<option value="other">Khác</option>
			    </select>
			</Form.Field>

		    </div>
		    {errors.pages && <p className="error-messages alert alert-danger" role="alert"><i className="fi fi-rr-exclamation"></i> Page count can't be negative</p>}
		</div>
		
		<div className="cover-image-outside-container">
		    <div className="cover-image-container mb-3">
			<span className="input-group-text mb-3">Ảnh bìa</span>
			{ dragDropZone }
			{ coverImage }
		    </div>

		    <div className="button-container">
			{ actionButton }
			<a href="/"><div className="btn btn-secondary m-1">Back</div></a>
		    </div>
		</div>

	    </Form>

	</div>
    );
}
