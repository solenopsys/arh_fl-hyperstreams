import { HStream} from './hstream';
import {firstValueFrom, Subject} from "rxjs";

describe('HStream', () => {

  it('should right prefix ', async () => {
    let fakeSubject:any = {};
    fakeSubject.next=(res:any)=>{fakeSubject.result=res}
    let hStream = new HStream(2212, 2, new Subject<ArrayBuffer>(), fakeSubject);
    let uint8Array = new Uint8Array([0, 0, 8, 164, 0, 2,0, 33,2,3,3,4]);

    let body = new Uint8Array([2,3,3,4]);
    hStream.send(body.buffer,33 )
    expect(new Uint8Array(fakeSubject.result)).toEqual(uint8Array);

    const dataView= new DataView(fakeSubject.result)
    const id = dataView.getUint32(0,false); // 'abc'
    expect(id).toEqual(2212);
  });


});

