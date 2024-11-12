import React from 'react';
import style from './ModalTypeCss/CategoryDelete.module.css';
import Button from '../../compoent/compoentItem/Button';
import useModal from '../../hook/useModal';
import { instance } from '../../store/axios_context';

const CategoryDelete = ( value : any) => { // Renamed to start with an uppercase letter

    const { closeModal } = useModal();
    const { categoryId, categoryName } = value;

    const handleCategoryDelete = async () => {
        if (categoryId) {
            const res = await instance.delete(`${process.env.REACT_APP_SERVER_URL}/api/category/delete/${categoryId}`);
            
            if (res.status === 200) {
                closeModal(0);
            } else {
                throw { code: 500, message: 'Unexpected Message' };
            }
        } else {
            throw { code: 500, message: 'Unexpected categoryId' };
        }
    };

    return (
        <div className={style.openMain__flexBox__popUp__category_delete}>
            <div className={style.openMain__flexBox__popUp__category_delete__p}>
                <h1>{`정말로 ${categoryName}을 삭제하시겠습니까?`}</h1>
                <p>카테고리에 포함되어 있는 일정은 기본 카테고리와 병합되며 <br />이후로는 되돌릴 수 없습니다.</p>
            </div>
            <Button background_color={'b-red'} color={'white'} handleClick={handleCategoryDelete}>Delete</Button>
        </div>
    );
}

export default CategoryDelete;