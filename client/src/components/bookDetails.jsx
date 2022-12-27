import React, { useEffect, useState, useContext, createContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Form } from 'semantic-ui-react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Header from './header.jsx';
import DragDropZone from './dragDropZone.jsx';
import AddToCart from './addToCart.jsx';
import CommentList from './commentList.jsx';
import '../css/bookDetails.css';

let BookContext = createContext();
export default function BookDetails(props) {
    const [ book, setBook ] = useState({});
    const [ files, setFiles ] = useState([]);
    const [ modalShow, setModalShow ] = React.useState(false);
    const [ modalDeleteShow, setModalDeleteShow ] = React.useState(false);
    const navigate = useNavigate();
    const { 
	register: bookRegister,
	handleSubmit: handleBookSubmit,
	formState: { errors : bookErrors },
	reset : resetBook
    } = useForm({
	defaultValues: book,
	mode: "onBlur",
    });

    let user = localStorage.getItem('user');
    user = JSON.parse(user);

    const onSubmit = async (data) => {
	const formData = new FormData();
	formData.append('book', JSON.stringify(data));
	formData.append('image', files[0]);
	setBook(data);

	await fetch(`/api/books/addBook`, { method: 'POST', body: formData })
	    .then((res) => { 
		if (res.ok) {
		    navigate('/');
		} else {
		    return res.json();
		}
	    })
    }

    const onEdit = async (data) => {
	const formData = new FormData();
	delete data['id'];
	formData.append('book', JSON.stringify(data));
	formData.append('image', files[0]);

	await fetch(`/api/books/editBook/${book.id}`, { method: 'POST', body: formData })
	    .then((res) => { 
		if (res.ok) {
		    navigate('/');
		} else {
		    return res.json();
		}
	    })
    }

    useEffect(() => {
	if (props.action !== 'add') {
	    const id = window.location.href.split('/')[5];
	    fetch(`/api/books/getBook/${id}`)
		.then((res) => res.json())
		.then((data) => {
		    setBook(data);
		    resetBook(data);
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

    if (user.role === 'admin') {
	if (props.action === 'view') {
	    actionButton = (
		<>
		    <Link to={`/book/edit/${book.id}`}><div className="btn btn-primary m-1">Edit</div></Link>
		    <div className="mt-1" onClick={() => setModalDeleteShow(true)}>
			<div className="btn btn-danger">Delete</div>
		    </div>
		    <BookContext.Provider value={book}>
			<CenteredModal
			    onHide={() =>{setModalDeleteShow(false)}}
			    book={book}
			    show={modalDeleteShow}
			/>
		    </BookContext.Provider>
		</>
	    );
	    if (book.cover_image !== '') coverImage = <img className="img-thumbnail" src={ handleCoverImage(book.cover_image) } alt="Book's Cover" />;
	    else coverImage = '';
	} else if (props.action === 'edit') {
	    dragDropZone = <DragDropZone files={files} setFiles={setFiles} />;
	    actionButton = <input type="submit" form={'book-' + book.id} className="btn btn-primary m-1" value="Submit"/>;
	    coverImage = '';
	} else if (props.action === 'add') {
	    actionButton = <input type="submit" form={'book-' + book.id} className="btn btn-primary m-1" value="Submit"/>
	    dragDropZone = <DragDropZone files={files} setFiles={setFiles} />;
	}
    } else if (user.role === 'user') {
	if (props.action === 'view') {
	    actionButton = (
		<>
		    <div className="btn btn-primary m-1" onClick={() => setModalShow(true)}>Add to cart</div>
		    <AddToCart
			show={modalShow}
			book={book}
			user={user}
			onHide={() => setModalShow(false)}
		    />
		</>
	    );
	    if (book.cover_image !== '') coverImage = <img className="img-thumbnail" src={ handleCoverImage(book.cover_image) } alt="Book's Cover" />;
	    else coverImage = '';
	} else if (props.action === 'edit'  || props.action === 'add') {
	    navigate('/');
	} 
    }

    return (
	<>
	    <Header/>
	    <div className="content">
		<div className="detail-container">
		    <Form className="form" id={'book-' + book.id} onSubmit={ props.action !== 'edit' ? handleBookSubmit(onSubmit) : handleBookSubmit(onEdit) }>
			<div className="form-container">
			    
			    <Form.Field className="input-group mb-3">
				<div className="input-group-prepend">
				    <span className="input-group-text">Tên sách</span>
				</div>
				<input type="text" className="form-control"
				       name="title"
				       disabled={ (props.action === 'edit' || props.action === 'add') ? false : true }
				       {...bookRegister("title", { 
					   required: "Title is required!", 
					   maxLength: {
					       value: 100,
					       message: "Title must be less than 100 characters!"
					   }
				       })}
				/>
			    </Form.Field>
			    {bookErrors.title && <p className="error-messages alert alert-danger"><i className="fi fi-rr-exclamation"></i> { bookErrors.title.message }</p>}

			    <Form.Field className="input-group mb-3">
				<div className="input-group-prepend">
				    <span className="input-group-text">Tác giả</span>
				</div>
				<input type="text" className="form-control"
				       name="author"
				       disabled={ (props.action === 'edit' || props.action === 'add') ? false : true }
				       {...bookRegister("author", {
					   required: "Author is required!",
					   maxLength: {
					       value: 30,
					       message: "Author's name can't have more than 30 characters!"
					   }
				       })}
				></input>
			    </Form.Field>
			    {bookErrors.author && <p className="error-messages alert alert-danger"><i className="fi fi-rr-exclamation"></i> { bookErrors.author.messages }</p>}

			    <Form.Field className="input-group mb-3">
				<span className="input-group-text">Mô tả</span>
				<textarea className="form-control"
					  rows="5"
					  name="description"
					  disabled={ (props.action === 'edit' || props.action === 'add') ? false : true }
					  {...bookRegister("description")}
				></textarea>
			    </Form.Field>

			    <Form.Field className="input-group mb-3">
				<div className="input-group-prepend">
				    <span className="input-group-text">Ngày phát hành</span>
				</div>
				<input type="date"
				       className="form-control"
				       name="release_date"
				       disabled={ (props.action === 'edit' || props.action === 'add') ? false : true }
				       {...bookRegister("release_date")}
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
					   disabled={ (props.action === 'edit' || props.action === 'add') ? false : true }
					   {...bookRegister("pages", { 
					       min: {
						   value: 0,
						   message: "Pages number must be greater than 0"
					       },
					       max: {
						   value: 32767,
						   message: "Pages number must be smaller than 32767"
					       }
					   })}
				    ></input>
				</Form.Field>

				<Form.Field className="input-group mb-3">
				    <div className="input-group-prepend">
					<span className="input-group-text">Thể loại</span>
				    </div>
				    <select name="category"
					    disabled={ (props.action === 'edit' || props.action === 'add') ? false : true }
					    {...bookRegister("category")}
					    className="form-control">
					<option value="law">Chính trị – pháp luật</option>
					<option value="selfhelp">Phát triển bản thân</option>
					<option value="science">Khoa học công nghệ</option>
					<option value="finance">Kinh tế</option>
					<option value="literature">Văn học nghệ thuật</option>
					<option value="history">Văn hóa xã hội – Lịch sử</option>
					<option value="novel">Truyện, tiểu thuyết</option>
					<option value="politic">Tâm lý, tâm linh, tôn giáo</option>
					<option value="teenage">Thiếu nhi</option>
					<option value="other">Khác</option>
				    </select>
				</Form.Field>

			    </div>
			    {bookErrors.pages && <p className="error-messages alert alert-danger"><i className="fi fi-rr-exclamation"></i> { bookErrors.pages.message }</p>}
			</div>
			
			<div className="cover-image-outside-container">
			    <div className="cover-image-container mb-3">
				<span className="input-group-text mb-3">Ảnh bìa</span>
				{ dragDropZone }
				{ coverImage }
			    </div>

			</div>

		    </Form>

		    <div className="button-container">
			<a href="/"><div className="btn btn-secondary m-1">Back</div></a>
			{ actionButton }
		    </div>

		    <hr className="divider"/>
		    <div className="text-muted mb-3"><i>Comment section</i></div>
		    <CommentList book={book}/>

		</div>
	    </div>
	</>
    );
}

async function handleOnDelete(e, id) {
    await fetch(`/api/books/delete/${id}`)
	.then((res) => { 
	    res.json();
	    window.location.href = '/';
	});
}

function CenteredModal(props) {
    const book = useContext(BookContext);

    return (
	<Modal
	    {...props}
	    aria-labelledby="contained-modal-title-vcenter"
	    centered
	>
	    <Modal.Header closeButton>
		<Modal.Title id="contained-modal-title-vcenter">
		    Confirmation
		</Modal.Title>
	    </Modal.Header>
	    <Modal.Body>
		<p>
		    Are you sure you want to delete this book: {props.book.title}?
		</p>
	    </Modal.Body>
	    <Modal.Footer>
		<Button className="btn btn-danger" onClick={(e) => {handleOnDelete(e, props.book.id)}}>Delete</Button>
		<Button onClick={props.onHide}>Close</Button>
	    </Modal.Footer>
	</Modal>
    );
}
