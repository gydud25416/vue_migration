import { defineStore } from 'pinia'
import axios from 'axios';
import type { Data } from '@/common.type';

interface State {
  watchDeleteData: Data | null
}

export const useFetchStore = defineStore('fetch',{
 state: ():State=>({
  watchDeleteData: null
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
 },
});
