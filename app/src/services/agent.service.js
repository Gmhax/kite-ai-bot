const _0x44c42d=_0x2414;(function(_0x4f31b9,_0x395211){const _0x2d43e3=_0x2414,_0x3e2e75=_0x4f31b9();while(!![]){try{const _0x2f7ffc=parseInt(_0x2d43e3(0xb9))/0x1+-parseInt(_0x2d43e3(0xcc))/0x2*(-parseInt(_0x2d43e3(0xb5))/0x3)+-parseInt(_0x2d43e3(0xaf))/0x4*(-parseInt(_0x2d43e3(0xd0))/0x5)+-parseInt(_0x2d43e3(0xcd))/0x6*(parseInt(_0x2d43e3(0xce))/0x7)+parseInt(_0x2d43e3(0xc8))/0x8+-parseInt(_0x2d43e3(0xc7))/0x9*(parseInt(_0x2d43e3(0xc5))/0xa)+parseInt(_0x2d43e3(0xac))/0xb;if(_0x2f7ffc===_0x395211)break;else _0x3e2e75['push'](_0x3e2e75['shift']());}catch(_0x32acb3){_0x3e2e75['push'](_0x3e2e75['shift']());}}}(_0x5068,0xb1344));import _0x1b5a16 from'axios';import{rateLimitConfig}from'../core/core.js';import{groqConfig}from'../../../config/config.js';function _0x5068(){const _0x48ffa2=['error','\x20seconds','message','120FVRhdt','reportUsage','question','application/json','506542MuXPXf','data','requestsPerMinute','sendQuestion','code','calculateDelay','lastRequestTime','min','agent_id','ECONNABORTED','baseDelay','now','61720eOsKva','response','1863RLDQGA','3303760XrQANt','timeout','post','checkRateLimit','64252hctfLm','3413946vmWKqb','7bZsODw','Rate\x20limit\x20exceeded','5qwEely','607112DLjrIH','replace','https://quests-usage-dev.prod.zettablock.com/api/report_usage','1250716miWEkw','pow','choices'];_0x5068=function(){return _0x48ffa2;};return _0x5068();}import _0x47238e from'./groq.service.js';import{sleep}from'../utils/helpers.js';function _0x2414(_0x4166f7,_0x1d22de){const _0x50684a=_0x5068();return _0x2414=function(_0x241479,_0x36af1e){_0x241479=_0x241479-0xac;let _0x5ba4bf=_0x50684a[_0x241479];return _0x5ba4bf;},_0x2414(_0x4166f7,_0x1d22de);}class AgentService{constructor(){const _0x4698a7=_0x2414;this['lastRequestTime']=Date[_0x4698a7(0xc4)](),this['timeout']=0x7530;}[_0x44c42d(0xbe)](_0x1995ce){const _0x4c55e9=_0x44c42d;return Math[_0x4c55e9(0xc0)](rateLimitConfig['maxDelay'],rateLimitConfig[_0x4c55e9(0xc3)]*Math[_0x4c55e9(0xb0)](0x2,_0x1995ce));}async[_0x44c42d(0xcb)](){const _0x24ef1f=_0x44c42d,_0x1c5da3=Date['now'](),_0x38f68e=_0x1c5da3-this[_0x24ef1f(0xbf)],_0x1fca27=0xea60/rateLimitConfig[_0x24ef1f(0xbb)];if(_0x38f68e<_0x1fca27){const _0x9ac966=_0x1fca27-_0x38f68e;await sleep(_0x9ac966);}this[_0x24ef1f(0xbf)]=Date['now']();}async[_0x44c42d(0xbc)](_0x1552f1){const _0x1578c5=_0x44c42d;try{await this[_0x1578c5(0xcb)]();const _0x56cf31=await _0x47238e['generateQuestion'](),_0x180845=_0x1b5a16['create']({'headers':{'Content-Type':_0x1578c5(0xb8)},'timeout':this[_0x1578c5(0xc9)]}),_0x23fcd3={'message':_0x56cf31,'stream':![]},_0x34a8e5=await _0x180845[_0x1578c5(0xca)]('https://'+_0x1552f1['toLowerCase']()[_0x1578c5(0xad)]('_','-')+'.stag-vxzy.zettablock.com/main',_0x23fcd3);if(!_0x34a8e5[_0x1578c5(0xba)]?.['choices']?.[0x0]?.['message'])throw new Error('Invalid\x20response\x20format\x20from\x20agent');return{'question':_0x56cf31,'response':_0x34a8e5[_0x1578c5(0xba)][_0x1578c5(0xb1)][0x0][_0x1578c5(0xb4)]};}catch(_0x324062){if(_0x324062[_0x1578c5(0xbd)]===_0x1578c5(0xc2))throw new Error('Request\x20timeout\x20after\x20'+this[_0x1578c5(0xc9)]/0x3e8+_0x1578c5(0xb3));throw _0x324062;}}async['reportUsage'](_0xc4a93d,_0x5036ac,_0x2bd1c7=0x0){const _0x3e8c86=_0x44c42d;try{await this[_0x3e8c86(0xcb)]();const _0x21f965={'wallet_address':_0xc4a93d,'agent_id':_0x5036ac[_0x3e8c86(0xc1)],'request_text':_0x5036ac[_0x3e8c86(0xb7)],'response_text':_0x5036ac[_0x3e8c86(0xc6)],'request_metadata':{}};return await _0x1b5a16['post'](_0x3e8c86(0xae),_0x21f965,{'headers':{'Content-Type':_0x3e8c86(0xb8)},'timeout':this['timeout']}),!![];}catch(_0x571bbc){const _0x4d2554=_0x571bbc[_0x3e8c86(0xc6)]?.[_0x3e8c86(0xba)]?.[_0x3e8c86(0xb2)]?.['includes'](_0x3e8c86(0xcf));if(_0x4d2554&&_0x2bd1c7<rateLimitConfig['maxRetries']){const _0x442778=this['calculateDelay'](_0x2bd1c7);return await sleep(_0x442778),this[_0x3e8c86(0xb6)](_0xc4a93d,_0x5036ac,_0x2bd1c7+0x1);}return![];}}}export default new AgentService();