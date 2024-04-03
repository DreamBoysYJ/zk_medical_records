import { Response, NextFunction} from 'express';
import db from '../models';
import {MyRequest} from '../@types/session';




// 진료 기록 작성
export const write_post = async (req: MyRequest, res: Response, next: NextFunction) => {
    try {
        // 1. 프론트에서 정보 받아오기

        // 2. 블록체인에 기록

        // 3. 응답해주기
    } catch (error) {
        
    }

    // try {
    //   // 1. 프론트에서 알레오 지갑 연결시 지갑 주소 받아오기
  
    //   if (!req.body.address) {
    //     return sendResponse(res, 400, '알레오 지갑 연결을 확인하세요');
    //   }
    //   const {address, role} = req.body;
    //   console.log('========address========', address);
  
    //   // 2. DB에 같은 address 있는지 확인
    //   const exists = await db.User.findOne({
    //     where: {
    //       address,
    //       role,
    //     },
    //   });
    //   console.log('=====exists====', exists);
  
    //   // 3. session에 해당 user 정보 저장
    //   req.session.loggedIn = true;
    //   req.session.user = exists;
    //   console.log('세션', req.session.user?.id);
    //   return sendResponse(res, 200, '로그인 성공!', exists);
    // } catch (e) {
    //   console.log(e);
    //   return sendResponse(res, 400, '로그인에 실패했습니다');
    // }
  };



