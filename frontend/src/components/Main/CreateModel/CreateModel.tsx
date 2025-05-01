import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import AxiosService from "../../../axios/Axios";
import "./CreateModel.css"

import {Add, Change, Delete, Save, Cancel} from "../Icons/Icons";


interface CreateDirectoryProps {
    category?: string | undefined
    value?: number | undefined
    modelName?: string | undefined
    modelDescription?: string | undefined
}
const CreateModel = (props: CreateDirectoryProps) => {
    const {category, value, modelName, modelDescription} = props;
    // @ts-ignore
    const CategoryBase = useSelector(state => state.Data.CategoryBase)
    // @ts-ignore
    const Status = useSelector(state => state.Data.Status)
    const [directoryName, setDirectoryName] = useState<string>('');
    const [directoryText, setDirectoryText] = useState<string>('');
    const [clickChange, setClickChange] = useState(false);
    const [clickAdd, setClickAdd] = useState(false);

    const [categoryError, setCategoryError] = useState<string>('');
    const [validError, setValidError ] = useState<boolean>(false);

    const handleClickChange = () => {
        setClickChange(!clickChange);
        setCategoryError('');
    }
    const handleClickAdd = () => {
        setClickAdd(!clickAdd);
        setCategoryError('');
    }
    useEffect(() => {
        if (directoryName) {
            setValidError(false)
            CategoryBase[category]?.forEach((item: any) => {
                switch (item.name){
                    case (directoryName):
                        setCategoryError('Такая модель есть в базе!!!')
                        setValidError(true)
                    }
                }
            )
        }
    }, [directoryName]); // eslint-disable-line

    const handleCreateCategory = async() => {
        if (!directoryName && !directoryText) {
            setCategoryError('Заполните поля!!!')
        } else if (directoryName && !directoryText){
            setCategoryError('Заполните описание!!!')
        } else if (!directoryName && directoryText){
            setCategoryError('Напишите название модели!!!')
        } else if (directoryName && directoryText && !validError){
            try {
                AxiosService.CreateCategory({
                    'model': category,
                    'name': directoryName,
                    'description': directoryText,
                })
                handleClickAdd()
            } catch (error: any) {
                console.error(error.message);
            }
        }
    }
    const handleSaveChange = async() => {
        if (!value && directoryText) {
            setCategoryError('Выберите модель в которую хотите добавить это описание!!!')
        } else if (value && !directoryText) {
            setCategoryError('Вы не внесли изменений!!!')
        } else if (!value && !directoryText) {
            setCategoryError('Выберите модель в которой хотите изменить описание!!!')
        } else if (value && directoryText) {
            try {
                AxiosService.ChangeCategory({
                    'id': value,
                    'name': modelName,
                    'model': category,
                    'text': directoryText,
                })
                handleClickChange()
            } catch (error: any) {
                console.error(error.message);
            }
        }
    }

    const handleDelete = async() => {
        if (!value) {
            setCategoryError('Выберите модель которую хотите удалить!!!')
        } else {
            const conf = window.confirm('Вы уверены что хотите удалить модель?',)
            if (conf) {
                try {
                    AxiosService.deleteCategory({
                        'id': value,
                        'name': modelName,
                        'model': category,
                    })
                    handleClickChange()
                } catch (error: any) {
                    console.error(error.message);
                }
            }
        }
    }
    return (
        <div
            className='createDirectory-container'
            style={Status !== 'Manager'? {display: 'none'}: {} }>
            <div className={!clickAdd ? 'createDirectory-BlockAdd' :
                'createDirectory-BlockAdd active'}>
                <div className='createDirectory-textBlock'>
                    <input
                        onChange={e => setDirectoryName(e.target.value)}/>
                    <textarea
                        onChange={e => setDirectoryText(e.target.value)}/>
                    <p className='createDirectory-error'>{categoryError}</p>
                </div>
                <div className='createDirectory-btnBlock'>
                    <span onClick={handleClickAdd}><Cancel/></span>
                    <span onClick={handleCreateCategory}><Save/></span>
                </div>
            </div>

            <div className={!clickChange ? 'createDirectory-BlockChange' :
                'createDirectory-BlockChange active'}>
                <div className='createDirectory-textBlock2'>
                    <p>{modelName}</p>
                    <textarea
                        onChange={e => setDirectoryText(e.target.value)}
                        defaultValue={modelDescription}>

                    </textarea>
                    <p className='createDirectory-error'>{categoryError}</p>
                </div>
                <div className='createDirectory-btnBlock2'>
                    <span onClick={handleSaveChange}><Save/></span>
                    <span onClick={handleClickChange}><Cancel/></span>
                    <span onClick={handleDelete}><Delete/></span>
                </div>
            </div>

            <div className='createDirectory-btnBlock1'>
                <span onClick={handleClickAdd}><Add/></span>
                <span onClick={handleClickChange}><Change/></span>
            </div>
        </div>
    )
}


export default CreateModel;

