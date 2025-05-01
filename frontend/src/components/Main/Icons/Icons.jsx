import { CgAddR, CgTrash } from "react-icons/cg";
import { BiAddToQueue, BiXCircle, BiSave, BiEditAlt } from "react-icons/bi";
import React from "react";
import "./Icons.css"


export const Add = () => {
    return (
        <span className='icons'
            title={'Дополнить справочник'}>
            <BiAddToQueue />
        </span>
    )
}


export const Change = () => {
    return (
        <span className='icons'
              title={'Изменить описание'}>
            <BiEditAlt />
        </span>
    )
}

export const Save = () => {
    return (
        <span className='icons'
              title={'Сохранить'}>
            <BiSave />
        </span>
    )
}


export const Delete = () => {
    return (
        <span className='icons'
              title={'Удалить категорию из справочника'}>
            < CgTrash/>
        </span>
    )
}


export const Cancel = () => {
    return (
        <span className='icons'
              title={'Отменить'}>
            < BiXCircle/>
        </span>
    )
}


