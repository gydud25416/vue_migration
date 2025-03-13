import { defineStore } from 'pinia'
import axios from 'axios';
import type { Data } from '@/common.type';
import router from '@/router';

interface State {
  watchDeleteData: Data | null
  watchPostData: Data | null
}

export const useFetchStore = defineStore('fetch',{
 state: ():State=>({
  watchDeleteData: null,
  watchPostData: null,
 }),
 getters:{},
 actions:{
  async delete(apiUrl:string, ){
    if(window.confirm("삭제하시겠습니까?")){
      try{
        const results = await axios.delete(apiUrl);
        this.watchDeleteData = results.data
        alert("삭제되었습니다.")
      }
      catch(error){
        console.error("삭제 중 오류 발생:", error);
        alert("삭제에 실패했습니다. 다시 시도해주세요.");
      }
    }
  },
  async create<T>(apiUrl: string, apiBodyData: T){
    if(window.confirm("저장하시겠습니까?")){
      try {
          const results = await axios.post(apiUrl ,apiBodyData)
          this.watchPostData = results.data
      }
      catch(error){
        console.error(error);
      }
      alert("저장되었습니다.");
      router.push('/');
    }
  }
 },
});
