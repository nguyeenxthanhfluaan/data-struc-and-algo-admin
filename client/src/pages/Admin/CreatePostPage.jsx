import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import { CKEditor } from '@ckeditor/ckeditor5-react'
// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import { toast } from 'react-toastify'

import { createPost } from '../../redux/post/post.actions'

import Button from '../../components/Button'
import Helmet from '../../components/Helmet'

import Editor from 'ckeditor5-custom-build/build/ckeditor'
import { CKEditor } from '@ckeditor/ckeditor5-react'

const editorConfiguration = {
	toolbar: {
		items: [
			'heading',
			'|',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'|',
			'fontSize',
			'fontFamily',
			'fontColor',
			'fontBackgroundColor',
			'|',
			'alignment:left',
			'alignment:center',
			'alignment:right',
			'alignment:justify',
			'|',
			'link',
			'bulletedList',
			'numberedList',
			'|',
			'indent',
			'outdent',
			'|',
			'uploadImage',
			'blockQuote',
			'undo',
			'redo',
			'codeBlock',
		],
		shouldNotGroupWhenFull: true,
	},
	ckfinder: { uploadUrl: '/img/upload' },
}

const CreatePostPage = () => {
	const dispatch = useDispatch()

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [content, setContent] = useState('')
	const [type, setType] = useState('')
	const [category, setCategory] = useState('')
	const [subject, setSubject] = useState('')
	const [keywords, setKeywords] = useState('')

	console.log({ content })

	const { categories, subjects, types } = useSelector(
		({ category, subject, type }) => ({
			categories: category.categories,
			subjects: subject.subjects,
			types: type.types,
		})
	)

	const resetForm = useCallback(() => {
		setTitle('')
		setDescription('')
		setContent('')
		setType('')
		setKeywords('')
		setCategory('')
		setSubject('')
	}, [])

	const submitForm = () => {
		if (title && description && content && type && category && subject) {
			dispatch(
				createPost(
					{
						title,
						description,
						content,
						type,
						category,
						subject,
						keywords: keywords.split(',').map((item) => item.trim()),
					},
					resetForm
				)
			)
		} else {
			toast.error('Nhập đầy đủ dữ liệu bắt buộc')
		}
	}

	return (
		<Helmet title='Tạo bài mới'>
			<div className='create-post'>
				<div className='create-post__form-group'>
					<label
						htmlFor='create-post__name'
						className='create-post__title'
					>
						Nhập tên bài đăng <i>*</i>
					</label>
					<input
						type='text'
						id='create-post__title'
						className='create-post__input'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder='Nhập tên bài đăng'
					/>
				</div>
				<div className='create-post__form-group'>
					<label htmlFor='' className='create-post__title'>
						Nhập mô tả <i>*</i>
					</label>
					<input
						type='text'
						className='create-post__input'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder='Nhập tên bài đăng'
					/>
				</div>
				<div className='create-post__form-group'>
					<label htmlFor='' className='create-post__title'>
						Chọn loại <i>*</i>
					</label>
					<select
						className='create-post__select'
						value={type}
						onChange={(e) => setType(e.target.value)}
					>
						<option value=''>-- Nhập loại --</option>
						{types &&
							types.length > 0 &&
							types.map((item) => (
								<option key={item._id} value={item._id}>
									{item.name}
								</option>
							))}
					</select>
				</div>
				<div className='create-post__form-group'>
					<label htmlFor='' className='create-post__title'>
						Chọn danh mục <i>*</i>
					</label>
					<select
						className='create-post__select'
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					>
						<option value=''>-- Chọn danh mục --</option>
						{categories &&
							categories.length > 0 &&
							categories.map((item) => (
								<option key={item._id} value={item._id}>
									{item.name}
								</option>
							))}
					</select>
					<div className='create-post__form-group'>
						<label htmlFor='' className='create-post__title'>
							Chọn chủ đề <i>*</i>
						</label>
						<select
							className='create-post__select'
							value={subject}
							onChange={(e) => setSubject(e.target.value)}
						>
							<option value=''>-- Chọn chủ đề --</option>
							{subjects &&
								subjects.length > 0 &&
								subjects.map((item) =>
									item.category._id === category ? (
										<option key={item._id} value={item._id}>
											{item.name}
										</option>
									) : null
								)}
						</select>
					</div>
				</div>
				<div className='create-post__form-group'>
					<label htmlFor='' className='create-post__title'>
						Nhập nội dung <i>*</i>
					</label>
					<CKEditor
						editor={Editor}
						config={editorConfiguration}
						data={content}
						onReady={(editor) => {
							editor?.ui
								.getEditableElement()
								.parentElement.insertBefore(
									editor?.ui.view.toolbar.element,
									editor?.ui.getEditableElement()
								)
						}}
						onChange={(event, editor) => {
							const data = editor.getData()
							setContent(data)
						}}
						onBlur={(event, editor) => {
							console.log('Blur.', editor)
						}}
						onFocus={(event, editor) => {
							console.log('Focus.', editor)
						}}
					/>
					{/* <CKEditor
						editor={DecoupledEditor}
						onReady={(editor) => {
							editor?.ui
								.getEditableElement()
								.parentElement.insertBefore(
									editor?.ui.view.toolbar.element,
									editor?.ui.getEditableElement()
								)
						}}
						data={content}
						onChange={(event, editor) => {
							const data = editor.getData()
							setContent(data)
						}}
						config={{
							ckfinder: { uploadUrl: '/img/upload' },
						}}
					/> */}
				</div>
				<div className='create-post__form-group'>
					<label htmlFor='' className='create-post__title'>
						Nhập từ khóa (mỗi từ khóa cách nhau bởi dấu ',')
					</label>
					<input
						type='text'
						className='create-post__input'
						value={keywords}
						onChange={(e) => setKeywords(e.target.value)}
						placeholder='Nhập từ khóa'
					/>
				</div>
				<div className='create-post__btn-group'>
					<Button className='create-post__btn' onClick={resetForm}>
						Reset
					</Button>
					<Button className='create-post__btn' onClick={submitForm}>
						Tạo bài
					</Button>
				</div>
			</div>
		</Helmet>
	)
}

export default CreatePostPage
