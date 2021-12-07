import React from "react";
import Button from "@atlaskit/button";
// npm install --save styled-components
import styled, {css} from "styled-components";
import CheckIcon from "@atlaskit/icon/glyph/check";

const ButtonStyled=styled(Button) `
    margin-top:5px;
    text-align:left;
    &:hover{
        .check-icon{
            display:inline-block;
        }
    }
    ${p=>
    p.isComplete && 
    css`
    text-decoration:line-through;`
    }

    .check-icon{
        display:none;

        &:hover{
            background-color:#e2e2e2;
            border-radius:3px;
        }
    }
`

export default function Todo({todo,onCheckBtnClick}){
    return ( 
    <>
        {/* shouldFitContainer: Làm các button chiếm hết khoảng không gian của container */}
            <ButtonStyled 
            isComplete={todo.isCompleted}
            shouldFitContainer 
            
                iconAfter={
                    <span className="check-icon" onClick={()=>onCheckBtnClick(todo.id)}>
                        <CheckIcon primaryColor="#4fff4f"/>
                    </span>
                    }
                >
                {todo.name}
            </ButtonStyled>
    </> 
    )
    
}