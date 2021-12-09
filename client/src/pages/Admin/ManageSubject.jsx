import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
	faEdit,
	faTrashAlt,
	faSave,
	faTimesCircle,
	faPlusCircle,
} from '@fortawesome/free-solid-svg-icons'

import Button from '../../components/Button'
import {
	addSubject,
	deleteSubject,
	updateSubject,
} from '../../redux/subject/subject.actions'

const ManageSubject = () => {
	const { categories, subjects } = useSelector(({ category, subject }) => ({
		categories: category.categories,
		subjects: subject.subjects,
	}))

	return (
		<div className='manage-subject'>
			{categories &&
				categories.length > 0 &&
				categories.map((cateogoryItem) => {
					return (
						<CategoryContainer
							key={cateogoryItem._id}
							category={cateogoryItem}
							subjects={subjects.filter(
								(subjectItem) =>
									subjectItem.category._id === cateogoryItem._id
							)}
						/>
					)
				})}
		</div>
	)
}

const CategoryContainer = ({ category, subjects }) => {
	const dispatch = useDispatch()

	const inputRef = useRef()

	const [activatedAddSubject, setActivatedAddSubject] = useState(false)
	const [newSubject, setNewSubject] = useState('')

	useEffect(() => {
		if (activatedAddSubject) {
			try {
				inputRef.current.focus()
			} catch (error) {}
		}
	}, [activatedAddSubject])

	const handleAddSubject = (e) => {
		e.preventDefault()
		dispatch(addSubject({ name: newSubject, category: category._id }))
		setNewSubject('')
	}

	return (
		<div className='manage-subject__category'>
			<h5 className='manage-subject__category__title'>{category.name}</h5>

			{subjects &&
				subjects.length > 0 &&
				subjects.map((subjectItem) => (
					<FormSubject
						key={`${category._id}${subjectItem._id}`}
						subject={subjectItem}
					/>
				))}

			<form className='manage-subject__form-group'>
				{activatedAddSubject ? (
					<>
						<input
							type='text'
							className='manage-subject__input'
							value={newSubject}
							onChange={(e) => setNewSubject(e.target.value)}
							ref={inputRef}
						/>
						<Button
							className='manage-subject__btn cancel'
							type='button'
							onClick={() => setActivatedAddSubject(false)}
						>
							<FontAwesomeIcon
								icon={faTimesCircle}
								className='manage-subject__btn__icon'
							/>
							Hủy bỏ
						</Button>
						<Button
							className='manage-subject__btn save'
							type='submit'
							onClick={handleAddSubject}
						>
							<FontAwesomeIcon
								icon={faSave}
								className='manage-subject__btn__icon'
							/>
							Lưu
						</Button>
					</>
				) : (
					<Button
						className='manage-subject__btn add'
						type='button'
						onClick={() => setActivatedAddSubject(true)}
					>
						<FontAwesomeIcon
							icon={faPlusCircle}
							className='manage-subject__btn__icon'
						/>
						Thêm danh mục
					</Button>
				)}
			</form>
		</div>
	)
}

const FormSubject = ({ subject }) => {
	const dispatch = useDispatch()

	const inputRef = useRef()

	const [activatedEdit, setActivatedEdit] = useState(false)
	const [subjectName, setSubjectName] = useState(subject.name)

	useEffect(() => {
		if (activatedEdit) {
			try {
				inputRef.current.focus()
			} catch (error) {}
		}
	}, [activatedEdit])

	const handleEdit = (e) => {
		e.preventDefault()
		dispatch(
			updateSubject({
				...subject,
				name: subjectName,
			})
		)
		setActivatedEdit(false)
	}

	const handleDeleteSubject = () => {
		dispatch(deleteSubject({ _id: subject._id }))
	}

	return (
		<form className='manage-subject__form-group'>
			<input
				type='text'
				className='manage-subject__input'
				value={subjectName}
				disabled={activatedEdit ? false : true}
				onChange={(e) => setSubjectName(e.target.value)}
				ref={inputRef}
			/>
			{activatedEdit ? (
				<>
					<Button
						className='manage-subject__btn cancel'
						type='button'
						onClick={() => setActivatedEdit(false)}
					>
						<FontAwesomeIcon
							icon={faTimesCircle}
							className='manage-subject__btn__icon'
						/>
						Hủy bỏ
					</Button>
					<Button
						className='manage-subject__btn save'
						type='submit'
						onClick={handleEdit}
					>
						<FontAwesomeIcon
							icon={faSave}
							className='manage-subject__btn__icon'
						/>
						Lưu
					</Button>
				</>
			) : (
				<Button
					className='manage-subject__btn edit'
					type='button'
					onClick={() => setActivatedEdit(true)}
				>
					<FontAwesomeIcon
						icon={faEdit}
						className='manage-subject__btn__icon'
					/>
					Chỉnh sửa
				</Button>
			)}
			<Button
				className='manage-subject__btn delete'
				type='button'
				onClick={handleDeleteSubject}
			>
				<FontAwesomeIcon
					icon={faTrashAlt}
					className='manage-subject__btn__icon'
				/>
				Xóa
			</Button>
		</form>
	)
}

export default ManageSubject
