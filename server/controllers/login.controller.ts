import { Response, NextFunction} from 'express';
import db from '../models';
import {MyRequest} from '../@types/session';
import {sendResponse} from './utils';




// 홈페이지는 프론트에서 서비스 소개 페이지로 대체 될 예정


// 로그인
export const login_post = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    // 1. 프론트에서 알레오 지갑 연결시 지갑 주소 받아오기

    if (!req.body.address) {
      return sendResponse(res, 400, '알레오 지갑 연결을 확인하세요');
    }
    const {address, role} = req.body;
    console.log('========address========', address);

    // 2. DB에 같은 address 있는지 확인
    const exists = await db.User.findOne({
      where: {
        address,
        role,
      },
    });
    console.log('=====exists====', exists);

    // 3. session에 해당 user 정보 저장
    req.session.loggedIn = true;
    req.session.user = exists;
    console.log('세션', req.session.user?.id);
    return sendResponse(res, 200, '로그인 성공!', exists);
  } catch (e) {
    console.log(e);
    return sendResponse(res, 400, '로그인에 실패했습니다');
  }
};



//로그인 확인
export const checklogin_get = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.session.user) throw new Error(`not login`);
    const id = req.session.user.id;
    const result = await db.User.findOne({
      where: {
        id,
      },
    });
    sendResponse(res, 200, '로그인 상태', result);
  } catch (e) {
    sendResponse(res, 400, '로그인 상태X');
    console.log(e);
  }
};

