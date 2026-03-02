import type * as _ from "../../gleam.d.mts";
import type * as $vattr from "../../lustre/vdom/vattr.d.mts";
import type * as $vnode from "../../lustre/vdom/vnode.d.mts";

export function html<SMK>(
  attrs: _.List<$vattr.Attribute$<SMK>>,
  children: _.List<$vnode.Element$<SMK>>
): $vnode.Element$<SMK>;

export function text(content: string): $vnode.Element$<any>;

export function base<SMS>(attrs: _.List<$vattr.Attribute$<SMS>>): $vnode.Element$<
  SMS
>;

export function head<SMW>(
  attrs: _.List<$vattr.Attribute$<SMW>>,
  children: _.List<$vnode.Element$<SMW>>
): $vnode.Element$<SMW>;

export function link<SNC>(attrs: _.List<$vattr.Attribute$<SNC>>): $vnode.Element$<
  SNC
>;

export function meta<SNG>(attrs: _.List<$vattr.Attribute$<SNG>>): $vnode.Element$<
  SNG
>;

export function style<SNK>(attrs: _.List<$vattr.Attribute$<SNK>>, css: string): $vnode.Element$<
  SNK
>;

export function title<SNO>(
  attrs: _.List<$vattr.Attribute$<SNO>>,
  content: string
): $vnode.Element$<SNO>;

export function body<SNS>(
  attrs: _.List<$vattr.Attribute$<SNS>>,
  children: _.List<$vnode.Element$<SNS>>
): $vnode.Element$<SNS>;

export function address<SNY>(
  attrs: _.List<$vattr.Attribute$<SNY>>,
  children: _.List<$vnode.Element$<SNY>>
): $vnode.Element$<SNY>;

export function article<SOE>(
  attrs: _.List<$vattr.Attribute$<SOE>>,
  children: _.List<$vnode.Element$<SOE>>
): $vnode.Element$<SOE>;

export function aside<SOK>(
  attrs: _.List<$vattr.Attribute$<SOK>>,
  children: _.List<$vnode.Element$<SOK>>
): $vnode.Element$<SOK>;

export function footer<SOQ>(
  attrs: _.List<$vattr.Attribute$<SOQ>>,
  children: _.List<$vnode.Element$<SOQ>>
): $vnode.Element$<SOQ>;

export function header<SOW>(
  attrs: _.List<$vattr.Attribute$<SOW>>,
  children: _.List<$vnode.Element$<SOW>>
): $vnode.Element$<SOW>;

export function h1<SPC>(
  attrs: _.List<$vattr.Attribute$<SPC>>,
  children: _.List<$vnode.Element$<SPC>>
): $vnode.Element$<SPC>;

export function h2<SPI>(
  attrs: _.List<$vattr.Attribute$<SPI>>,
  children: _.List<$vnode.Element$<SPI>>
): $vnode.Element$<SPI>;

export function h3<SPO>(
  attrs: _.List<$vattr.Attribute$<SPO>>,
  children: _.List<$vnode.Element$<SPO>>
): $vnode.Element$<SPO>;

export function h4<SPU>(
  attrs: _.List<$vattr.Attribute$<SPU>>,
  children: _.List<$vnode.Element$<SPU>>
): $vnode.Element$<SPU>;

export function h5<SQA>(
  attrs: _.List<$vattr.Attribute$<SQA>>,
  children: _.List<$vnode.Element$<SQA>>
): $vnode.Element$<SQA>;

export function h6<SQG>(
  attrs: _.List<$vattr.Attribute$<SQG>>,
  children: _.List<$vnode.Element$<SQG>>
): $vnode.Element$<SQG>;

export function hgroup<SQM>(
  attrs: _.List<$vattr.Attribute$<SQM>>,
  children: _.List<$vnode.Element$<SQM>>
): $vnode.Element$<SQM>;

export function main<SQS>(
  attrs: _.List<$vattr.Attribute$<SQS>>,
  children: _.List<$vnode.Element$<SQS>>
): $vnode.Element$<SQS>;

export function nav<SQY>(
  attrs: _.List<$vattr.Attribute$<SQY>>,
  children: _.List<$vnode.Element$<SQY>>
): $vnode.Element$<SQY>;

export function section<SRE>(
  attrs: _.List<$vattr.Attribute$<SRE>>,
  children: _.List<$vnode.Element$<SRE>>
): $vnode.Element$<SRE>;

export function search<SRK>(
  attrs: _.List<$vattr.Attribute$<SRK>>,
  children: _.List<$vnode.Element$<SRK>>
): $vnode.Element$<SRK>;

export function blockquote<SRQ>(
  attrs: _.List<$vattr.Attribute$<SRQ>>,
  children: _.List<$vnode.Element$<SRQ>>
): $vnode.Element$<SRQ>;

export function dd<SRW>(
  attrs: _.List<$vattr.Attribute$<SRW>>,
  children: _.List<$vnode.Element$<SRW>>
): $vnode.Element$<SRW>;

export function div<SSC>(
  attrs: _.List<$vattr.Attribute$<SSC>>,
  children: _.List<$vnode.Element$<SSC>>
): $vnode.Element$<SSC>;

export function dl<SSI>(
  attrs: _.List<$vattr.Attribute$<SSI>>,
  children: _.List<$vnode.Element$<SSI>>
): $vnode.Element$<SSI>;

export function dt<SSO>(
  attrs: _.List<$vattr.Attribute$<SSO>>,
  children: _.List<$vnode.Element$<SSO>>
): $vnode.Element$<SSO>;

export function figcaption<SSU>(
  attrs: _.List<$vattr.Attribute$<SSU>>,
  children: _.List<$vnode.Element$<SSU>>
): $vnode.Element$<SSU>;

export function figure<STA>(
  attrs: _.List<$vattr.Attribute$<STA>>,
  children: _.List<$vnode.Element$<STA>>
): $vnode.Element$<STA>;

export function hr<STG>(attrs: _.List<$vattr.Attribute$<STG>>): $vnode.Element$<
  STG
>;

export function li<STK>(
  attrs: _.List<$vattr.Attribute$<STK>>,
  children: _.List<$vnode.Element$<STK>>
): $vnode.Element$<STK>;

export function menu<STQ>(
  attrs: _.List<$vattr.Attribute$<STQ>>,
  children: _.List<$vnode.Element$<STQ>>
): $vnode.Element$<STQ>;

export function ol<STW>(
  attrs: _.List<$vattr.Attribute$<STW>>,
  children: _.List<$vnode.Element$<STW>>
): $vnode.Element$<STW>;

export function p<SUC>(
  attrs: _.List<$vattr.Attribute$<SUC>>,
  children: _.List<$vnode.Element$<SUC>>
): $vnode.Element$<SUC>;

export function pre<SUI>(
  attrs: _.List<$vattr.Attribute$<SUI>>,
  children: _.List<$vnode.Element$<SUI>>
): $vnode.Element$<SUI>;

export function ul<SUO>(
  attrs: _.List<$vattr.Attribute$<SUO>>,
  children: _.List<$vnode.Element$<SUO>>
): $vnode.Element$<SUO>;

export function a<SUU>(
  attrs: _.List<$vattr.Attribute$<SUU>>,
  children: _.List<$vnode.Element$<SUU>>
): $vnode.Element$<SUU>;

export function abbr<SVA>(
  attrs: _.List<$vattr.Attribute$<SVA>>,
  children: _.List<$vnode.Element$<SVA>>
): $vnode.Element$<SVA>;

export function b<SVG>(
  attrs: _.List<$vattr.Attribute$<SVG>>,
  children: _.List<$vnode.Element$<SVG>>
): $vnode.Element$<SVG>;

export function bdi<SVM>(
  attrs: _.List<$vattr.Attribute$<SVM>>,
  children: _.List<$vnode.Element$<SVM>>
): $vnode.Element$<SVM>;

export function bdo<SVS>(
  attrs: _.List<$vattr.Attribute$<SVS>>,
  children: _.List<$vnode.Element$<SVS>>
): $vnode.Element$<SVS>;

export function br<SVY>(attrs: _.List<$vattr.Attribute$<SVY>>): $vnode.Element$<
  SVY
>;

export function cite<SWC>(
  attrs: _.List<$vattr.Attribute$<SWC>>,
  children: _.List<$vnode.Element$<SWC>>
): $vnode.Element$<SWC>;

export function code<SWI>(
  attrs: _.List<$vattr.Attribute$<SWI>>,
  children: _.List<$vnode.Element$<SWI>>
): $vnode.Element$<SWI>;

export function data<SWO>(
  attrs: _.List<$vattr.Attribute$<SWO>>,
  children: _.List<$vnode.Element$<SWO>>
): $vnode.Element$<SWO>;

export function dfn<SWU>(
  attrs: _.List<$vattr.Attribute$<SWU>>,
  children: _.List<$vnode.Element$<SWU>>
): $vnode.Element$<SWU>;

export function em<SXA>(
  attrs: _.List<$vattr.Attribute$<SXA>>,
  children: _.List<$vnode.Element$<SXA>>
): $vnode.Element$<SXA>;

export function i<SXG>(
  attrs: _.List<$vattr.Attribute$<SXG>>,
  children: _.List<$vnode.Element$<SXG>>
): $vnode.Element$<SXG>;

export function kbd<SXM>(
  attrs: _.List<$vattr.Attribute$<SXM>>,
  children: _.List<$vnode.Element$<SXM>>
): $vnode.Element$<SXM>;

export function mark<SXS>(
  attrs: _.List<$vattr.Attribute$<SXS>>,
  children: _.List<$vnode.Element$<SXS>>
): $vnode.Element$<SXS>;

export function q<SXY>(
  attrs: _.List<$vattr.Attribute$<SXY>>,
  children: _.List<$vnode.Element$<SXY>>
): $vnode.Element$<SXY>;

export function rp<SYE>(
  attrs: _.List<$vattr.Attribute$<SYE>>,
  children: _.List<$vnode.Element$<SYE>>
): $vnode.Element$<SYE>;

export function rt<SYK>(
  attrs: _.List<$vattr.Attribute$<SYK>>,
  children: _.List<$vnode.Element$<SYK>>
): $vnode.Element$<SYK>;

export function ruby<SYQ>(
  attrs: _.List<$vattr.Attribute$<SYQ>>,
  children: _.List<$vnode.Element$<SYQ>>
): $vnode.Element$<SYQ>;

export function s<SYW>(
  attrs: _.List<$vattr.Attribute$<SYW>>,
  children: _.List<$vnode.Element$<SYW>>
): $vnode.Element$<SYW>;

export function samp<SZC>(
  attrs: _.List<$vattr.Attribute$<SZC>>,
  children: _.List<$vnode.Element$<SZC>>
): $vnode.Element$<SZC>;

export function small<SZI>(
  attrs: _.List<$vattr.Attribute$<SZI>>,
  children: _.List<$vnode.Element$<SZI>>
): $vnode.Element$<SZI>;

export function span<SZO>(
  attrs: _.List<$vattr.Attribute$<SZO>>,
  children: _.List<$vnode.Element$<SZO>>
): $vnode.Element$<SZO>;

export function strong<SZU>(
  attrs: _.List<$vattr.Attribute$<SZU>>,
  children: _.List<$vnode.Element$<SZU>>
): $vnode.Element$<SZU>;

export function sub<TAA>(
  attrs: _.List<$vattr.Attribute$<TAA>>,
  children: _.List<$vnode.Element$<TAA>>
): $vnode.Element$<TAA>;

export function sup<TAG>(
  attrs: _.List<$vattr.Attribute$<TAG>>,
  children: _.List<$vnode.Element$<TAG>>
): $vnode.Element$<TAG>;

export function time<TAM>(
  attrs: _.List<$vattr.Attribute$<TAM>>,
  children: _.List<$vnode.Element$<TAM>>
): $vnode.Element$<TAM>;

export function u<TAS>(
  attrs: _.List<$vattr.Attribute$<TAS>>,
  children: _.List<$vnode.Element$<TAS>>
): $vnode.Element$<TAS>;

export function var$<TAY>(
  attrs: _.List<$vattr.Attribute$<TAY>>,
  children: _.List<$vnode.Element$<TAY>>
): $vnode.Element$<TAY>;

export function wbr<TBE>(attrs: _.List<$vattr.Attribute$<TBE>>): $vnode.Element$<
  TBE
>;

export function area<TBI>(attrs: _.List<$vattr.Attribute$<TBI>>): $vnode.Element$<
  TBI
>;

export function audio<TBM>(
  attrs: _.List<$vattr.Attribute$<TBM>>,
  children: _.List<$vnode.Element$<TBM>>
): $vnode.Element$<TBM>;

export function img<TBS>(attrs: _.List<$vattr.Attribute$<TBS>>): $vnode.Element$<
  TBS
>;

export function map<TBW>(
  attrs: _.List<$vattr.Attribute$<TBW>>,
  children: _.List<$vnode.Element$<TBW>>
): $vnode.Element$<TBW>;

export function track<TCC>(attrs: _.List<$vattr.Attribute$<TCC>>): $vnode.Element$<
  TCC
>;

export function video<TCG>(
  attrs: _.List<$vattr.Attribute$<TCG>>,
  children: _.List<$vnode.Element$<TCG>>
): $vnode.Element$<TCG>;

export function embed<TCM>(attrs: _.List<$vattr.Attribute$<TCM>>): $vnode.Element$<
  TCM
>;

export function iframe<TCQ>(attrs: _.List<$vattr.Attribute$<TCQ>>): $vnode.Element$<
  TCQ
>;

export function object<TCU>(attrs: _.List<$vattr.Attribute$<TCU>>): $vnode.Element$<
  TCU
>;

export function picture<TCY>(
  attrs: _.List<$vattr.Attribute$<TCY>>,
  children: _.List<$vnode.Element$<TCY>>
): $vnode.Element$<TCY>;

export function portal<TDE>(attrs: _.List<$vattr.Attribute$<TDE>>): $vnode.Element$<
  TDE
>;

export function source<TDI>(attrs: _.List<$vattr.Attribute$<TDI>>): $vnode.Element$<
  TDI
>;

export function math<TDM>(
  attrs: _.List<$vattr.Attribute$<TDM>>,
  children: _.List<$vnode.Element$<TDM>>
): $vnode.Element$<TDM>;

export function svg<TDS>(
  attrs: _.List<$vattr.Attribute$<TDS>>,
  children: _.List<$vnode.Element$<TDS>>
): $vnode.Element$<TDS>;

export function canvas<TDY>(attrs: _.List<$vattr.Attribute$<TDY>>): $vnode.Element$<
  TDY
>;

export function noscript<TEC>(
  attrs: _.List<$vattr.Attribute$<TEC>>,
  children: _.List<$vnode.Element$<TEC>>
): $vnode.Element$<TEC>;

export function script<TEI>(attrs: _.List<$vattr.Attribute$<TEI>>, js: string): $vnode.Element$<
  TEI
>;

export function del<TEM>(
  attrs: _.List<$vattr.Attribute$<TEM>>,
  children: _.List<$vnode.Element$<TEM>>
): $vnode.Element$<TEM>;

export function ins<TES>(
  attrs: _.List<$vattr.Attribute$<TES>>,
  children: _.List<$vnode.Element$<TES>>
): $vnode.Element$<TES>;

export function caption<TEY>(
  attrs: _.List<$vattr.Attribute$<TEY>>,
  children: _.List<$vnode.Element$<TEY>>
): $vnode.Element$<TEY>;

export function col<TFE>(attrs: _.List<$vattr.Attribute$<TFE>>): $vnode.Element$<
  TFE
>;

export function colgroup<TFI>(
  attrs: _.List<$vattr.Attribute$<TFI>>,
  children: _.List<$vnode.Element$<TFI>>
): $vnode.Element$<TFI>;

export function table<TFO>(
  attrs: _.List<$vattr.Attribute$<TFO>>,
  children: _.List<$vnode.Element$<TFO>>
): $vnode.Element$<TFO>;

export function tbody<TFU>(
  attrs: _.List<$vattr.Attribute$<TFU>>,
  children: _.List<$vnode.Element$<TFU>>
): $vnode.Element$<TFU>;

export function td<TGA>(
  attrs: _.List<$vattr.Attribute$<TGA>>,
  children: _.List<$vnode.Element$<TGA>>
): $vnode.Element$<TGA>;

export function tfoot<TGG>(
  attrs: _.List<$vattr.Attribute$<TGG>>,
  children: _.List<$vnode.Element$<TGG>>
): $vnode.Element$<TGG>;

export function th<TGM>(
  attrs: _.List<$vattr.Attribute$<TGM>>,
  children: _.List<$vnode.Element$<TGM>>
): $vnode.Element$<TGM>;

export function thead<TGS>(
  attrs: _.List<$vattr.Attribute$<TGS>>,
  children: _.List<$vnode.Element$<TGS>>
): $vnode.Element$<TGS>;

export function tr<TGY>(
  attrs: _.List<$vattr.Attribute$<TGY>>,
  children: _.List<$vnode.Element$<TGY>>
): $vnode.Element$<TGY>;

export function button<THE>(
  attrs: _.List<$vattr.Attribute$<THE>>,
  children: _.List<$vnode.Element$<THE>>
): $vnode.Element$<THE>;

export function datalist<THK>(
  attrs: _.List<$vattr.Attribute$<THK>>,
  children: _.List<$vnode.Element$<THK>>
): $vnode.Element$<THK>;

export function fieldset<THQ>(
  attrs: _.List<$vattr.Attribute$<THQ>>,
  children: _.List<$vnode.Element$<THQ>>
): $vnode.Element$<THQ>;

export function form<THW>(
  attrs: _.List<$vattr.Attribute$<THW>>,
  children: _.List<$vnode.Element$<THW>>
): $vnode.Element$<THW>;

export function input<TIC>(attrs: _.List<$vattr.Attribute$<TIC>>): $vnode.Element$<
  TIC
>;

export function label<TIG>(
  attrs: _.List<$vattr.Attribute$<TIG>>,
  children: _.List<$vnode.Element$<TIG>>
): $vnode.Element$<TIG>;

export function legend<TIM>(
  attrs: _.List<$vattr.Attribute$<TIM>>,
  children: _.List<$vnode.Element$<TIM>>
): $vnode.Element$<TIM>;

export function meter<TIS>(
  attrs: _.List<$vattr.Attribute$<TIS>>,
  children: _.List<$vnode.Element$<TIS>>
): $vnode.Element$<TIS>;

export function optgroup<TIY>(
  attrs: _.List<$vattr.Attribute$<TIY>>,
  children: _.List<$vnode.Element$<TIY>>
): $vnode.Element$<TIY>;

export function option<TJE>(
  attrs: _.List<$vattr.Attribute$<TJE>>,
  label: string
): $vnode.Element$<TJE>;

export function output<TJI>(
  attrs: _.List<$vattr.Attribute$<TJI>>,
  children: _.List<$vnode.Element$<TJI>>
): $vnode.Element$<TJI>;

export function progress<TJO>(
  attrs: _.List<$vattr.Attribute$<TJO>>,
  children: _.List<$vnode.Element$<TJO>>
): $vnode.Element$<TJO>;

export function select<TJU>(
  attrs: _.List<$vattr.Attribute$<TJU>>,
  children: _.List<$vnode.Element$<TJU>>
): $vnode.Element$<TJU>;

export function textarea<TKA>(
  attrs: _.List<$vattr.Attribute$<TKA>>,
  content: string
): $vnode.Element$<TKA>;

export function details<TKE>(
  attrs: _.List<$vattr.Attribute$<TKE>>,
  children: _.List<$vnode.Element$<TKE>>
): $vnode.Element$<TKE>;

export function dialog<TKK>(
  attrs: _.List<$vattr.Attribute$<TKK>>,
  children: _.List<$vnode.Element$<TKK>>
): $vnode.Element$<TKK>;

export function summary<TKQ>(
  attrs: _.List<$vattr.Attribute$<TKQ>>,
  children: _.List<$vnode.Element$<TKQ>>
): $vnode.Element$<TKQ>;

export function slot<TKW>(
  attrs: _.List<$vattr.Attribute$<TKW>>,
  fallback: _.List<$vnode.Element$<TKW>>
): $vnode.Element$<TKW>;

export function template<TLC>(
  attrs: _.List<$vattr.Attribute$<TLC>>,
  children: _.List<$vnode.Element$<TLC>>
): $vnode.Element$<TLC>;
