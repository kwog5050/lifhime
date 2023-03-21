import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

/**
 * @param {*} board 게시글리스트
 * @param {*} setBoardList 검색값으로 새로 게시글리스트 변경
 * @param {*} searchType 검색타입
 * @returns 
 */

const Searching = ({ board, setBoardList, searchType }) => {
    const nav = useNavigate();
    const [searchValue, setSearchValue] = useState("");

    const searchTypes = {
        title: {
            prop: "title",
            placeholder: "제목 검색"
        },
        orderNumber: {
            prop: "orderCode",
            placeholder: "주문번호 검색"
        },
        email: {
            prop: "user_email",
            placeholder: "이메일 검색"
        }
    };

    const search = () => {
        if (searchValue.length <= 1) {
            alert("2글자 이상 입력해주세요");
            return;
        }

        const arr = board.filter(el =>
            el.del !== "Y" && el[searchTypes[searchType].prop].indexOf(searchValue) !== -1
        );

        if (arr.length === 0) {
            alert("검색된 게시글이 없습니다");
            return;
        }

        nav(`?search=${searchValue}`);
        // setBoardList(arr);
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "search":
                setSearchValue(value);
                break;
            default:
                break;
        }
    };

    const enterKeypress = (e) => {
        if (e.key === "Enter") {
            search();
        }
    };

    const { placeholder } = searchTypes[searchType];

    return (
        <Wrapper>
            <input
                type="text"
                placeholder={placeholder}
                name="search"
                value={searchValue}
                onChange={onChange}
                onKeyPress={enterKeypress}
            />
            <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: inline-block;
    position: relative;

    input {
        border: 1px solid #aaa;
        width: 250px;
        padding: 5px;
        border-radius: 5px;
    }

    i {
        position: absolute;   
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        color: #aaa;
        cursor: pointer;
    }
  `;

export default Searching;