import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../enum/routes";
import {
  validateEmail,
  validateEmailCheck,
  validatePassword,
  validateNickName,
  validateNickCheck,
} from "../../util/formValidation";
import { HttpStatusCode } from "../../enum/httpStautsCode";
import { successMessage, errorMessage } from "../common/message/Message";
import * as api from "../../api/api";

import {
  PageBlock,
  FormBlock,
  TitleBlock,
  EmailBlock,
  NickBlock,
} from "./FormStyle";
import { InputBlock, ButtonBlock } from "../common/form/FormStyled";

import { Form } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

function Register() {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: "",
    nickname: "",
    password: "",
    checkPassword: "",
  });
  const [emailCheck, setEmailCheck] = useState(false);
  const [nickCheck, setNickCheck] = useState(false);
  const [form] = Form.useForm();

  function onChange(e) {
    const { name, value } = e.currentTarget;
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function onFinish() {
    if (emailCheck && nickCheck) {
      try {
        const res = await api.post("user/register", {
          ...formValue,
        });
        successMessage(`${res.data.nickname}님 환영합니다`);
        navigate(ROUTES.USER.LOGIN);
      } catch (e) {
        console.error(e);
        setEmailCheck(false);
        setNickCheck(false);
      }
    } else if (!emailCheck) {
      errorMessage("이메일 중복확인을 해주세요");
    } else if (!nickCheck) {
      errorMessage("닉네임 중복확인을 해주세요.");
    }
  }

  const isEmailValid = validateEmailCheck(formValue.email);
  const isNickValid = validateNickCheck(formValue.nickname);

  async function onEmailCheck() {
    try {
      const {
        status,
        data: { message },
      } = await api.post("user/email-check", {
        email: formValue.email,
      });

      if (status === HttpStatusCode.Created) {
        successMessage(message);
        setEmailCheck(true);
      }
      if (status === HttpStatusCode.Ok) {
        errorMessage(message);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function onNickCheck() {
    try {
      const {
        status,
        data: { message },
      } = await api.post("user/nick-check", {
        nickname: formValue.nickname,
      });

      if (status === HttpStatusCode.Created) {
        successMessage(message);
        setNickCheck(true);
      }
      if (status === HttpStatusCode.Ok) {
        errorMessage(message);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <PageBlock>
      <FormBlock form={form} onFinish={onFinish}>
        <TitleBlock>
          <h2>Sign Up</h2>
          <span>회원가입을 위해 정보를 입력해 주세요.</span>
        </TitleBlock>
        <EmailBlock>
          <Form.Item name="email" rules={[{ validator: validateEmail }]}>
            <InputBlock
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              name="email"
              value={formValue.email}
              onChange={onChange}
              className="registerEmail"
            />
          </Form.Item>
          <ButtonBlock
            type="button"
            onClick={onEmailCheck}
            disabled={!isEmailValid}
          >
            중복확인
          </ButtonBlock>
        </EmailBlock>
        <NickBlock>
          <Form.Item name="nickname" rules={[{ validator: validateNickName }]}>
            <InputBlock
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Nickname"
              name="nickname"
              value={formValue.nickname}
              onChange={onChange}
              className="registerNick"
            />
          </Form.Item>
          <ButtonBlock
            type="button"
            onClick={onNickCheck}
            disabled={!isNickValid}
          >
            중복확인
          </ButtonBlock>
        </NickBlock>

        <Form.Item name="password" rules={[{ validator: validatePassword }]}>
          <InputBlock
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            type="password"
            name="password"
            value={formValue.password}
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item
          name="checkPassword"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "비밀번호를 입력해 주세요.",
            },
            ({ getFieldValue }) => ({
              validator: (_, value) =>
                !value || getFieldValue("password") === value
                  ? Promise.resolve()
                  : Promise.reject(new Error("비밀번호가 일치하지 않습니다.")),
            }),
          ]}
        >
          <InputBlock
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Check Password"
            type="password"
            name="checkPassword"
            value={formValue.checkPassword}
            onChange={onChange}
          />
        </Form.Item>
        <ButtonBlock htmlType="submit" className="registerButton">
          회원가입
        </ButtonBlock>
      </FormBlock>
    </PageBlock>
  );
}

export default Register;
