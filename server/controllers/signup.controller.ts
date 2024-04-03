import { Response, NextFunction} from 'express';
import db from '../models';
import {MyRequest} from '../@types/session';
import {sendResponse} from './utils';



// 의사 회원가입 
export const singup_doctor_post = async (req: MyRequest, res: Response, next: NextFunction) => {
    try {
      // 1. 프론트에서 지갑 주소, 이름 받아오기
  
      if (!req.body.address) {
        return sendResponse(res, 400, '알레오 지갑 연결을 확인하세요');
      }

      if (!req.body.name) {
        return sendResponse(res, 400, '이름 입력을 확인하세요');
      }

      const {address, name} = req.body;

  
      // 2. DB에 같은 address 있는지 확인
      const exists = await db.User.findOne({
        where: {
          address,
          name,
          role : "doctor",
        },
      });
      console.log('=====exists====', exists);
      // // 2-2.없다면 db에 새로운 user 생성
      if (!exists) {
        console.log('whyy');
  
        const user = await db.User.create({
            address,
            name,
            role : "doctor",
        });
    
        // 3. session에 해당 user 정보 저장
        // req.session.loggedIn = true;
        // req.session.user = user;
        // console.log('session', req.session.user);
        return sendResponse(res, 200, '회원가입 성공!', user);
      }
      // 3. session에 해당 user 정보 저장
    //   req.session.loggedIn = true;
    //   req.session.user = exists;
    //   console.log('세션', req.session.user?.id);
      return sendResponse(res, 200, '회원가입 성공!', exists);
    } catch (e) {
      console.log(e);
      return sendResponse(res, 400, '회원가입에 실패했습니다');
    }
  };



// 환자 회원가입 
export const singup_person_post = async (req: MyRequest, res: Response, next: NextFunction) => {
    try {
      // 1. 프론트에서 지갑 주소, 이름 받아오기
  
      if (!req.body.address) {
        return sendResponse(res, 400, '알레오 지갑 연결을 확인하세요');
      }

      if (!req.body.name) {
        return sendResponse(res, 400, '이름 입력을 확인하세요');
      }

      const {address, name, role} = req.body;

  
      // 2. DB에 같은 address 있는지 확인
      const exists = await db.User.findOne({
        where: {
          address,
          name,
          role : "person",
        },
      });
      console.log('=====exists====', exists);
      // // 2-2.없다면 db에 새로운 user 생성
      if (!exists) {
        console.log('whyy');
  
        const user = await db.User.create({
            address,
            name,
            role : "person",
        });
    
        // 3. session에 해당 user 정보 저장
        // req.session.loggedIn = true;
        // req.session.user = user;
        // console.log('session', req.session.user);
        return sendResponse(res, 200, '회원가입 성공!', user);
      }
      // 3. session에 해당 user 정보 저장
    //   req.session.loggedIn = true;
    //   req.session.user = exists;
    //   console.log('세션', req.session.user?.id);
      return sendResponse(res, 200, '회원가입 성공!', exists);
    } catch (e) {
      console.log(e);
      return sendResponse(res, 400, '회원가입에 실패했습니다');
    }
  };
  