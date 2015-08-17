// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.defineMode("stata", function(config) {
  function wordObj(str) {
    var words = str.split(" "), res = {};
    for (var i = 0; i < words.length; ++i) res[words[i]] = true;
    return res;
  }
  var metas = wordObj("do exit shell ado stcmd use clear preserve restore joinby merge append cross collapse contract addtable reshape erase save drop keep inputst outputst replace expand set more capture");
  var atoms = wordObj("about ac ac_7 acprplot acprplot_7 adept adept_function adept_gender adept_gender_tables adept_labor adept_labor_tables adept_poverty adept_poverty_tables adept_sp adept_sp_tables adept_work adjust ado adoedit adopath adoupdate ais_tmpm alpha altcharl ameans an ano anov anova anova_estat anova_terms anovadef aorder ap apcfit apcspline apcspline_p app appe appen append aps arch arch_dr arch_estat arch_p archlm areg areg2 areg_11 areg_footnote areg_p arfima arfima_estat arfima_p arfimairf_create args arima arima_dr arima_estat arima_p as asclogit asclogit_estat asclogit_lf asclogit_p ascot asmprobit asmprobit_estat asmprobit_mfx__dlg asmprobit_p asprobit_estat asprobit_lf asprobit_p asprvalue asroprobit asroprobit_estat asroprobit_p ass asse asser assert attk attnd attnw attr atts avplot avplot_7 avplots avplots_7 bcal bcskew0 bfit bgodfrey binreg bip0_lf biplot biplot_10 bipp_lf bipr_lf bipr_p biprobit bitest bitesti bitowt blogit boot bootsamp bootstrap bootstrap_8 boxco_l boxco_p boxcox boxcox_6 boxcox_p bprobit br brant break brier bro brow brows browse brr brrstat bs bs_7 bsampl_w bsample bsample_7 bspline bsqreg bstat bstat_7 bstat_8 bstrap bstrap_7 by bys byso bysor bysort ca ca_estat ca_p ca_parse_normalize cabiplot camat candisc canon canon_8 canon_8_p canon_estat canon_p cap caplog caprojection capt captu captur capture case2alt cat catplot catplot_old cc cchart cchart_7 cci cd cdeco cdeco_jmp cem censobs_table center centile cf changeeol char chdir check_help checkdlgfiles checkestimationsample checkhlpfiles checksum chelp chitest chitest6 chitesti chitesti6 ci cii cl class classutil clear cli clis clist clo clog clog_lf clog_p clogi clogi_sw clogit clogit_lf clogit_p clogitp clogl_sw cloglog clonevar cls clslistarray cluster cluster_measures cluster_stop cluster_tree cluster_tree_8 clustermat cmdlog cmp cmp_clear cmp_d1 cmp_lf cmp_lf1 cmp_p cnr cnre cnreg cnreg_p cnreg_sw cnsreg codebook collaps4 collapse collin colormult_nb colormult_nw compare compress conf confi confir confirm confirmdir conren cons const constr constra constrai constrain constraint continue contour contract contrast contrasts copy copyright copysource cor corc corr corr2data corr_anti corr_kmo corr_smc corre correl correla correlat correlate corrgram cou coun count counterfactual countfit cox cox_p cox_sw coxbase coxhaz coxvar cprplot cprplot_7 crc cret cretu cretur creturn cross cs cscript cscript_log csi ct ct_is ctset ctst_5 ctst_st cttost cumsp cumsp_7 cumul cusum cusum_7 cutil d daclass daoneway datasig datasignature datetof db dbeta de dec deco decod decode deff des desc descr descri describ describe describe_mk describe_wrk_dlg descsave destring dfactor dfactor_estat dfactor_p dfbeta dfbeta_10 dfgls dfuller di di_g did2 dir dirstats dis discard discrim discrim_estat_common discrim_knn discrim_knn_estat discrim_knn_p discrim_lda discrim_lda_estat discrim_lda_p discrim_logistic discrim_logistic_estat discrim_logistic_p discrim_qda discrim_qda_estat discrim_qda_p disp disp_res disp_s displ displa display do2htm doe doed doedi doedit dotplot dotplot_7 dprobit drawnorm drop ds ds_util dsconcat dstdize dta_equal dunnett duplicates durbina dvech dvech_p dwstat dydx e eclplot ed edi edit egen eivreg elixhaus emdef en enc enco encod encode enumopt eq erase ereg ereg_lf ereg_p ereg_sw ereghet ereghet_glf ereghet_glf_sh ereghet_gp ereghet_ilf ereghet_ilf_sh ereghet_ip eret eretu eretur ereturn err erro error esize esizei est est_cfexist est_cfname est_clickable est_expand est_hold est_table est_unhold est_unholdok estadd estat estat_default estat_eform estat_esize estat_summ estat_vce_only esti estim estima estimat estimate estimates estimates_notes estimates_sample estout estpost estsimp eststo esttab etodow etof etomdy etpoisson etpoisson_p etreg etreg_fix_stripe etreg_restore_stripe etregr etregre etregres etregress ex exi exit exlogistic exlogistic_estat expand expandcl expoisson expoisson_estat export export_delimited export_excel expr_query extract_rmst extremes fac fact factext facto factor factor_estat factor_p factor_pca_rotated factor_rotate factormat fastgini fc fc_describe fc_get_modelname fc_problem_must_exist fc_solve fcast fcast_compute fcast_graph fdades fdadesc fdadescr fdadescri fdadescrib fdadescribe fdasav fdasave fdause fedit fh_st figout file filefilter fillin film find_hlp_file findfile findit findit_7 fit fitstat fl flexcurv fli flis flist fmm fmm_gamma_lf fmm_gamma_p fmm_lognormal_lf fmm_lognormal_p fmm_negbin1_lf fmm_negbin1_p fmm_negbin2_lf fmm_negbin2_p fmm_normal_lf fmm_normal_p fmm_poisson_lf fmm_poisson_p fmm_studentt_lf fmm_studentt_p fmmlc folders for for5_0 fore foreach forec foreca forecas forecast forecast_wrk_dlg form forma format forv forva forval forvalu forvalue forvalues fp fpredict frac_154 frac_adj frac_chk frac_cox frac_ddp frac_dis frac_dv frac_eqmodel frac_in frac_mun frac_pp frac_pq frac_pv frac_restrict frac_wgt frac_xo fracgen fracplot fracplot_7 fracpoly fracpoly_10 fracpred frencurv frmttable fron_ex fron_hn fron_p fron_tn fron_tn2 frontier fs ftabstat2 ftodate ftoe ftomdy ftowdate fvexpand fvrevar fvset fvunab g gamhet_glf gamhet_gp gamhet_ilf gamhet_ip gamma gamma_d2 gamma_p gamma_sw gammahet gammareg_lf gdi_hexagon gdi_spokes ge gen gene gener genera generat generate genrank genstd genvmean getcmds getmata gettoken ghk2version gicurve gidecomposition gl gladder gladder_7 glim_l01 glim_l02 glim_l03 glim_l04 glim_l05 glim_l06 glim_l07 glim_l08 glim_l09 glim_l10 glim_l11 glim_l12 glim_lf glim_mu glim_mypois glim_nw1 glim_nw2 glim_nw3 glim_p glim_v1 glim_v2 glim_v3 glim_v4 glim_v5 glim_v6 glim_v7 gllam_ll gllamm gllapred gllarob gllas_yu gllasim glm glm_6 glm_p glm_sw glmixed_b0 glmixed_b0r glmixed_ll glmixed_llr glmpred glo glob globa global glogit glogit_8 glogit_p gmeans gmm gmm_estat gmm_p gnbre_lf gnbreg gnbreg_5 gnbreg_p gomp_lf gompe_sw gomper_p gompertz gompertzhet gomphet_glf gomphet_glf_sh gomphet_gp gomphet_ilf gomphet_ilf_sh gomphet_ip gphdot gphpen gphprint gprefs gprobi_p gprobit gprobit_8 gr gr7 gr_copy gr_current gr_db gr_describe gr_dir gr_draw gr_draw_replay gr_drop gr_ed_axis_custom gr_ed_capture gr_ed_db gr_ed_dialog_util gr_edit gr_editviewopts gr_example gr_example2 gr_export gr_play gr_print gr_qscheme gr_query gr_read gr_redo gr_rename gr_replay gr_save gr_set gr_setscheme gr_table gr_undo gr_use graph graph7 grc1leg grebar greigen greigen_7 greigen_8 grmean grmeanby grmeanby_7 grss gs_fileinfo gs_filetype gs_graphinfo gs_stat gsem gsem_check_cluster gsem_ereturn gsem_estat gsem_estat_summ gsem_footnote gsem_markout gsem_model_hinfo_check gsem_newvarlist gsem_p gsem_parse gsem_parse_fl gsem_parse_gauss_args gsem_post gsort gwood h hadimvo hareg hausman haver he heck_d2 heckma_p heckman heckman_fix_stripe heckman_restore_stripe heckopr_p heckoprobit heckp_lf heckpr_p heckprob heckprobit heckprobit_p hel help hereg hetpr_lf hetpr_p hetprob hetprobit hetprobit_p hettest hexdump hglogit hilite hist hist_7 histogram hlogit hlu hmeans hotel hotelling hplogit hprobit hreg hsearch hshaz hshaz_ll icc icd9 icd9_ff icd9p icd9tmpm icdpic iciss iis imb import import_delimited import_excel import_haver impute imtest inbase include inf infi infil infile infix inp inpu input inputst ins insheet insp inspe inspec inspect integ inten intreg intreg_7 intreg_p intrg2_ll intrg_ll intrg_ll2 ipolate iqreg ir irf irf_create irfm iri is_st is_svy is_svysum is_xt isid istdize itreatreg ivpoisson ivpoisson_estat ivpoisson_footnote ivpoisson_p ivprob_1_lf ivprob_lf ivprobit ivprobit_estat ivprobit_footnote ivprobit_p ivqte ivreg ivreg_footnote ivregress ivregress_epilog ivregress_estat ivregress_p ivregress_prolog ivtob_1_lf ivtob_lf ivtobit ivtobit_footnote ivtobit_p jackknife jacknife javacall jhgeo_logit_ll jhpoi_logit_ll jknife jknife_6 jknife_8 jkstat joinby kalarma1 kap kap_3 kapmeier kappa kapwgt kdens kdens2 kdensity kdensity_7 keep ksm ksmirnov ktau kwallis l la lab labbe labcd labcopy labdel labdtch labe label labelbook labgen lablog labmap labmask labnoeq labreplace labvalch labvalclone labvalcombine labvarch ladder leastlikely levels levelsof leverage lfit lfit_p li lincom line linktest lis list listcoef listtex listwise lloghet_glf lloghet_glf_sh lloghet_gp lloghet_ilf lloghet_ilf_sh lloghet_ip llogi_sw llogis_p llogist llogistic llogistichet lnorm_lf lnorm_sw lnorma_p lnormal lnormalhet lnormhet_glf lnormhet_glf_sh lnormhet_gp lnormhet_ilf lnormhet_ilf_sh lnormhet_ip lnskew0 loadingplot loc loca local locreg log log2html log2html7 logi logis_lf logistic logistic_p logit logit_10 logit_estat logit_p loglogs lognormalreg_lf logout logrank loneway lookfor lookup lowess lowess_7 lpoly lpredict lrecomp lroc lroc_7 lrtest ls lsens lsens_7 lsens_x lstat ltable ltable_7 ltable_9 ltriang lv lvr2plot lvr2plot_7 m ma mac macr macro makecns man mano manov manova manova_estat manova_p manovatest mantel margeff margeff8 margin margins marginsplot mark markin markout marksample mat mat_capp mat_order mat_put_rr mat_rapp mata mata_clear mata_describe mata_drop mata_matdescribe mata_matsave mata_matuse mata_memory mata_mlib mata_mosave mata_rename mata_which matalabel matcproc matlist matlist_10 matname matr matri matrix matrix_input__dlg matstrik matwrite mca mca_estat mca_lookup mca_p mca_parse_normalize mcaplot mcaprojection mcc mcci md0_ md1_ md1debug_ md2_ md2debug_ mdesc mds mds_classical mds_dataheader mds_display mds_display_classical mds_display_modern mds_estat mds_euclidean mds_id2string mds_modern mds_p mds_parse_cdopts mds_parse_method mds_parse_normalize mds_parse_s2d mds_s2d mdsconfig mdslong mdsmat mdsshepard mdytoe mdytof me_derd mean means mecloglog mecloglog_estat mecloglog_p median meglm meglm_estat meglm_p melogit melogit_estat melogit_p memory menbreg menbreg_estat menbreg_p meologit meologit_estat meologit_p meoprobit meoprobit_estat meoprobit_p mepoisson mepoisson_estat mepoisson_p meprobit meprobit_estat meprobit_p meqparse meqrlogit meqrlogit_estat meqrlogit_p meqrpoisson meqrpoisson_estat meqrpoisson_p mer merg merge merge_10 merge_wrk_dlg metan metan_examples mfp mfp_10 mfx mgarch mgarch_ccc mgarch_ccc_p mgarch_dcc mgarch_dcc_p mgarch_dvech mgarch_dvech_p mgarch_vcc mgarch_vcc_p mhelp mhodds mi mi_cmd_add mi_cmd_append mi_cmd_convert mi_cmd_copy mi_cmd_describe mi_cmd_erase mi_cmd_estimate mi_cmd_expand mi_cmd_export mi_cmd_extract mi_cmd_genericset mi_cmd_import mi_cmd_impute mi_cmd_merge mi_cmd_misstable mi_cmd_passive mi_cmd_predict mi_cmd_predictnl mi_cmd_ptrace mi_cmd_query mi_cmd_register mi_cmd_rename mi_cmd_replace0 mi_cmd_reset mi_cmd_reshape mi_cmd_select mi_cmd_set mi_cmd_stjoin mi_cmd_stsplit mi_cmd_svyset mi_cmd_test mi_cmd_testtransform mi_cmd_unregister mi_cmd_unset mi_cmd_update mi_cmd_varying mi_cmd_xeq mi_sub_expand_flongsep mi_sub_replace0_flongsep mi_sub_reshape mi_sub_stjoin_flongsep mi_sub_stsplit_flongsep mi_sub_xeq_all mif2dta minbound misstable mixed mixed_estat mixed_ll mixed_ll_reparm mixed_p mkassert mkdir mkest mkmat mkspline ml ml_5 ml_adjs ml_bhhhs ml_c_d ml_check ml_clear ml_cnt ml_count_eval ml_debug ml_defd ml_dots ml_e0 ml_e0_bfgs ml_e0_cycle ml_e0_dfp ml_e0i ml_e1 ml_e1_bfgs ml_e1_bhhh ml_e1_cycle ml_e1_dfp ml_e2 ml_e2_cycle ml_ebfg0 ml_ebfr0 ml_ebfr1 ml_ebh0q ml_ebhh0 ml_ebhr0 ml_ebr0i ml_ecr0i ml_edfp0 ml_edfr0 ml_edfr1 ml_edr0i ml_eds ml_eer0i ml_egr0i ml_elf ml_elf_bfgs ml_elf_bhhh ml_elf_cycle ml_elf_dfp ml_elfi ml_elfs ml_enr0i ml_enrr0 ml_erdu0 ml_erdu0_bfgs ml_erdu0_bhhh ml_erdu0_bhhhq ml_erdu0_cycle ml_erdu0_dfp ml_erdu0_nrbfgs ml_exde ml_footnote ml_geqnr ml_grad0 ml_graph ml_hbhhh ml_hd0 ml_hold ml_init ml_inv ml_log ml_max ml_mlout ml_mlout_8 ml_model ml_nb0 ml_opt ml_p ml_p_allowmissscores ml_plot ml_query ml_rdgrd ml_repor ml_s_e ml_score ml_searc ml_showh ml_technique ml_unhold mleval mlexp mlexp_estat mlexp_p mlf_ mlmatbysum mlmatsum mlog mlogi mlogit mlogit_10 mlogit_footnote mlogit_p mlogit_p_10 mlopts mlsum mlvecsum mmerge mnl0_ mopt mopt_check_program mopt_post mopt_quietly mopt_trace mor more mov move mprobit mprobit_lf mprobit_p mprobit_p_11 mrdu0_ mrdu1_ mvdecode mvencode mvreg mvreg_estat mvtest mvtest_chi2test mvtest_corr mvtest_cov mvtest_dups mvtest_ftest mvtest_manotab mvtest_mean mvtest_norm mvtest_samples n nbreg nbreg_al nbreg_lf nbreg_p nbreg_sw nestreg net netplot newey newey_7 newey_estat newey_p news nl nl_7 nl_9 nl_9_p nl_p nl_p_7 nlcom nlcom_p nlexp2 nlexp2_7 nlexp2a nlexp2a_7 nlexp3 nlexp3_7 nlgom3 nlgom3_7 nlgom4 nlgom4_7 nlinit nllog3 nllog3_7 nllog4 nllog4_7 nlog_rd nlogit nlogit_estat nlogit_lf nlogit_p nlogitgen nlogittree nlpred nlsur nlsur_estat nlsur_p nnmatch no nobreak noi nois noisi noisil noisily normalreg_lf note notes notes_dlg novarabbrev nplate nptrend ntimeofday numlabel numlist odbc old_ver olo olog ologi ologi_sw ologit ologit_10 ologit_p ologitp on one onew onewa oneway op_colnm op_comp op_diff op_inv op_str opr opro oprob oprob_sw oprobi oprobi_p oprobit oprobit_10 oprobitp opts_exclusive order orthog orthpoly ou out outf outfi outfil outfile outputst outputstold outreg outreg2 outreg2_prf outs outsh outshe outshee outsheet ovtest pac pac_7 palette panels parmby parmcip parmest parse parse_dissim pause pca pca_8 pca_display pca_estat pca_p pca_rotate pcamat pchart pchart_7 pchi pchi_7 pcorr pctile pentium pergram pergram_7 permute permute_8 personal peto_st pgmhaz8 pgmhaz8_ll pgmhazgf2 pkcollapse pkcross pkequiv pkexamine pkexamine_7 pkshape pksumm pksumm_7 pl plo plot plreg plugin pnorm pnorm_7 poisgof poiss_lf poiss_sw poisso_p poisson poisson_estat poparms poparms_p poprisktime post postclose postfile postrtoe postutil pov_robust power power_anova_dim power_cmd_onecorr power_cmd_onecorr_parse power_cmd_onemean power_cmd_onemean_parse power_cmd_oneprop power_cmd_oneprop_parse power_cmd_onevar power_cmd_onevar_parse power_cmd_oneway power_cmd_oneway_parse power_cmd_pairedm power_cmd_pairedm_parse power_cmd_pairedpr power_cmd_pairedpr_parse power_cmd_repeated power_cmd_repeated_parse power_cmd_twocorr power_cmd_twocorr_parse power_cmd_twomeans power_cmd_twomeans_parse power_cmd_twoprop power_cmd_twoprop_parse power_cmd_twovar power_cmd_twovar_parse power_cmd_twoway power_cmd_twoway_parse powercal pperron pr praccum prais prais_e prais_e2 prais_p prchange prcounts prdc predict predictnl predlog preserve prgen prgen1 print pro prob probi probit probit_10 probit_estat probit_p probitiv proc_time procoverlay procrustes procrustes_estat procrustes_p profiler prog progr progra program projmanager prop proportion prtab prtest prtesti prvalue prvalue1 prwhich pscore psdensity psgraph psmatch2 pstest putexcel putexcel_cellexp_error putmata pwcompare pwcorr pwd pwmean qby qbys qchi qchi_7 qladder qladder_7 qll qnorm qnorm_7 qqplot qqplot_7 qreg qreg_c qreg_p qreg_sw qu quadchk quantile quantile_7 que quer query qui quie quiet quietl quietly range ranksum ratio rbounds rchart rchart_7 rcof rcsgen rcsgen_example rdbinselect rdbwselect rddqte rdrobust recast reclink recode reg reg3 reg3_10 reg3_p regdw regr regre regre_p2 regres regres_p regress regress_estat regriv_p remap remcor ren rena renam rename renpfix repeat replace reshape reshape_10 restore ret retu retur return rm rmdir robvar roccomp roccomp_7 roccomp_8 rocf_lf rocfit rocfit_8 rocgold rocplot rocplot_7 rocreg rocreg_estat rocreg_lf2 rocreg_p rocregplot rocregstat roctab roctab_7 rolling rologit rologit_p rot rota rotat rotate rotatemat rqdeco rqdeco3 rreg rreg_p rts ru run runtest rvfplot rvfplot_7 rvpplot rvpplot_7 sa safesum sample sampsi sasexe saswrapper sav savasas save savedresults saveold sc sca scal scala scalar scatter scm_mine sco scob_lf scob_p scobi_sw scobit scobit_footnote scor score scoreplot scoreplot_help scree screeplot screeplot_help sdr sdtest sdtesti se se2plot search sedecomposition seeout sem sem_check_data sem_display sem_epilog sem_estat sem_estat_eqgof sem_estat_eqtest sem_estat_framework sem_estat_ggof sem_estat_ginvariant sem_estat_gof sem_estat_mindices sem_estat_residuals sem_estat_scoretests sem_estat_stable sem_estat_stdize sem_estat_summ sem_estat_teffects sem_groupheader sem_mvsort sem_p sem_parse_display sem_parse_method sem_parse_pclass sem_parse_spec sem_util sembuilder sencode separate seperate serrbar serrbar_7 serset set set_defaults setx sfrancia sg__variables_vlist sh she shel shell shellout shewhart shewhart_7 shortdir shp2dta sigdif signestimationsample signrank signtest simqi simul simul_7 simulate simulate_8 sjlatex sjlog sjlog_7 sktest sleep slogit slogit_d2 slogit_footnote slogit_p smooth snapshot snapspan so sor sort spearman spell2panel spellmerge spellsplit spex spikeplot spikeplot_7 spikeplt spline_x split spmap spmap_arrow spmap_color spmap_diagram spmap_examples spmap_label spmap_line spmap_point spmap_polygon spmap_psl spmap_scalebar spostupdate sqreg sqreg_p sret sretu sretur sreturn srr ssc ssc_whatshot ssd ssd_build sspace sspace_estat sspace_p st st_ct st_hc st_hcd st_hcd_sh st_is st_issys st_note st_promo st_set st_show st_smpl st_subid stack statsby statsby_8 statsmat stbase stci stci_7 stcmd stcox stcox_estat stcox_footnote stcox_fr stcox_fr_ll stcox_p stcox_sw stcoxkm stcoxkm_7 stcoxkm_9 stcrr stcrr_lf stcrre stcrreg stcrreg_p stcstat stcstat2 stcurv stcurve stcurve_7 stdes stdescribe stem stepwise stereg stfill stgen stimeofday stir stjoin stmc stmh storedresults stphplot stphplot_7 stphplot_9 stphtest stphtest_7 stpm2 stpm2_ml_hazard stpm2_ml_hazard_rs stpm2_ml_lf_hazard stpm2_ml_lf_hazard_rs stpm2_ml_lf_log stpm2_ml_lf_normal_rs stpm2_ml_lf_theta stpm2_ml_lf_theta_rs stpm2_ml_normal stpm2_ml_odds stpm2_ml_odds_rs stpm2_mttf stpm2_pred stpm2cm stpm2trt stpmean stpow stpowe stpower stptime strate strate_7 streg streg_p streg_sw streghet_footnote streset strl strlread strlwrite sts sts_7 sts_9 stset stsplit stsum stsurvimpute sttocc sttoct studenttreg_lf stvary stweib su suest suest_8 sum summ summa summar summari summariz summarize sumqi sunflower sureg surface survcurv survsum svar svar_p svmat svmat2 svmatsv svy svy_disp svy_dreg svy_est svy_est_7 svy_estat svy_get svy_head svy_header svy_sub svy_sub_7 svy_x svy_x_7 svy_x_p svydes svydes_8 svydescribe svygen svygnbreg svyheckman svyheckprob svyintreg svyintreg_7 svyintrg svyivreg svylc svylog_p svylogit svymarkout svymarkout_8 svymean svymlog svymlogit svynbreg svyolog svyologit svyoprob svyoprobit svyopts svypois svypois_7 svypoisson svyprobit svyprobt svyprop svyprop_7 svyratio svyreg svyreg_p svyregress svyset svyset_7 svyset_8 svytab svytab_7 svytabform svytest svytotal sw sw_8 swcnreg swcox swereg swilk swlogis swlogit swologit swoprbt swpois swprobit swqreg swtobit swweib symmetry symmi symplot symplot_7 syntax synth synth_ll sysdescribe sysdir sysuse szroeter ta tab tab1 tab2 tab_or tabchi tabchii tabd tabdi tabdis tabdisp tabform tabi tabl table tablecol tabm tabodds tabodds_7 tabout tabplot tabplot6 tabsort tabsort6 tabsplit tabsplit6 tabstat tabstatout tabu tabul tabula tabulat tabulate te teffects teffects_estat teffects_p tempfile tempname tempvar tes test test_syntax_wrk_dlg testnl testparm teststd tetrachoric time_it timer tis tlogit tmpdir tnbreg tnbreg_cons tnbreg_mean tnbreg_p tob tobi tobit tobit_p tobit_sw tobitiv token tokeni tokeniz tokenize tostring total tpm tpm_p tpm_svy_check tpoiss_d2 tpoisson tpoisson_p tpredict_p2 translate translator transmap trauma treat_ll treatr_p treatreg treatreg_fix_stripe treatreg_footnote treatreg_restore_stripe treatrew trim triss trnb_cons trnb_mean trpoiss_d2 trunc_ll truncr_p truncreg tsappend tset tsfill tsfilter tsline tsline_ex tsreport tsreport_12 tsrevar tsrline tsset tssmooth tsunab ttest ttesti tut_chk tut_wait tutorial tw tware_st two twoway twoway__contour_gen twoway__fpfit_serset twoway__function_gen twoway__histogram_gen twoway__ipoint_serset twoway__ipoints_serset twoway__kdensity_gen twoway__lfit_serset twoway__normgen_gen twoway__patch_serset twoway__pci_serset twoway__qfit_serset twoway__scatteri_serset twoway__sunflower_gen twoway_ksm_serset ty typ type typeof u u_mi_assert_set u_mi_certify_data u_mi_check_monotone u_mi_check_setvars u_mi_curtime u_mi_dots u_mi_estimate u_mi_estimate_check_using u_mi_estimate_chk_commonopts u_mi_estimate_chk_eform u_mi_estimate_display u_mi_estimate_get_commonopts u_mi_estimate_table_header u_mi_estimate_using u_mi_fixchars u_mi_get_flongsep_tmpname u_mi_get_maxopts u_mi_getstubname u_mi_getwidevars u_mi_how_set u_mi_imexport_fix_pre_suf u_mi_impute u_mi_impute_augreg u_mi_impute_chained_labelvars u_mi_impute_check_condexp u_mi_impute_check_ivars u_mi_impute_check_method u_mi_impute_cmd_chained u_mi_impute_cmd_chained_init u_mi_impute_cmd_chained_parse u_mi_impute_cmd_intreg_parse u_mi_impute_cmd_logit_parse u_mi_impute_cmd_mlogit_parse u_mi_impute_cmd_monotone u_mi_impute_cmd_monotone_init u_mi_impute_cmd_monotone_parse u_mi_impute_cmd_mvn u_mi_impute_cmd_mvn_init u_mi_impute_cmd_mvn_parse u_mi_impute_cmd_nbreg_parse u_mi_impute_cmd_ologit_parse u_mi_impute_cmd_pmm_parse u_mi_impute_cmd_poisson_parse u_mi_impute_cmd_regress_parse u_mi_impute_cmd_truncreg_parse u_mi_impute_cmd_uvmethod u_mi_impute_cmd_uvmethod_init u_mi_impute_cmd_uvmethod_parse u_mi_impute_diexpheader u_mi_impute_difvheader u_mi_impute_fv2var u_mi_impute_genexpr u_mi_impute_get_cmdopts u_mi_impute_init_em u_mi_impute_initmat u_mi_impute_note_nomiss u_mi_impute_parse_exp u_mi_impute_parse_exp_ivars u_mi_impute_replace_expr u_mi_impute_replace_expvars u_mi_impute_sequential_parse u_mi_impute_table_legend u_mi_impute_xeq u_mi_impute_xeq_flong u_mi_impute_xeq_flongsep u_mi_impute_xeq_mlong u_mi_impute_xeq_wide u_mi_ivars_musthave_missing u_mi_make_chars_equal u_mi_map_style u_mi_mustbe_registered_imputed u_mi_no_sys_vars u_mi_no_wide_vars u_mi_not_mi_set u_mi_postbv u_mi_predictions u_mi_prefix_title u_mi_recast_ivars u_mi_save u_mi_sets_okay u_mi_sortback u_mi_tests u_mi_time_diff u_mi_token_mustbe u_mi_trcoef_legend u_mi_use u_mi_xeq_on_tmp_flongsep u_mi_zap_chars ucm ucm_estat ucm_p unab unabbrev unabcmd univstat unzipfile update us use use_option_wrk_dlg uselabel usesas usesasdel var var_mkcompanion var_p varabbrev varbasic varfcast vargranger varirf varirf_add varirf_cgraph varirf_create varirf_ctable varirf_describe varirf_dir varirf_drop varirf_erase varirf_graph varirf_ograph varirf_rename varirf_set varirf_table varlab varlmar varm varma varman varmana varmanag varmanage varnorm varsoc varstable varstable_w varstable_w2 varwle vce vec vec_fevd vec_mkphi vec_p vec_p_w vecirf_create veclmar veclmar_w vecnorm vecnorm_w vecrank vecstable verinst vers versi versio version view viewsource vif vwls vwls_p wdatetof webdescribe webgetsem webseek webuse weib1_lf weib2_lf weib_lf weib_lf0 weibhet_glf weibhet_glf_sh weibhet_glfa weibhet_glfa_sh weibhet_gp weibhet_ilf weibhet_ilf_sh weibhet_ilfa weibhet_ilfa_sh weibhet_ip weibu_sw weibul_p weibull weibull_c weibull_s weibullhet wh whelp whi which whil wilc_st wilcoxon win wind windo window winexec winsor wntestb wntestb_7 wntestq xchart xchart_7 xcollapse xcorr xcorr_7 xi xi_6 xmerge xmerged xml_tab xmlogplot xmlogview xmlsav xmlsave xmluse xpose xpost xprchange xsh xshe xshel xshell xt_iis xt_tis xtab xtab2_p xtab_p xtabond xtabond2 xtbin_p xtclog xtcloglog xtcloglog_8 xtcloglog_d2 xtcloglog_pa_p xtcloglog_re_p xtcnt_p xtcorr xtdata xtdes xtdescribe xtdpd xtdpd_estat xtdpd_p xtdpdsys xtfront_p xtfrontier xtgee xtgee_elink xtgee_estat xtgee_makeivar xtgee_p xtgee_plink xtgee_robust_epilog xtgee_robust_prolog xtgls xtgls_p xtgraph xthaus xthausman xtht_p xthtaylor xtile xtint_p xtintreg xtintreg_8 xtintreg_d2 xtintreg_p xtivp_1 xtivp_2 xtivreg xtline xtline_ex xtlogit xtlogit_11 xtlogit_8 xtlogit_d2 xtlogit_fe_p xtlogit_pa_p xtlogit_re_p xtmelogit xtmelogit_estat xtmelogit_p xtmepoisson xtmepoisson_estat xtmepoisson_p xtmixed xtmixed_estat xtmixed_p xtmrho xtnb_fe xtnb_lf xtnbreg xtnbreg_pa_p xtnbreg_refe_p xtologit xtoprobit xtordinal_p xtpcse xtpcse_p xtpois xtpoisson xtpoisson_d2 xtpoisson_pa_p xtpoisson_refe_p xtpqml xtpred xtprobit xtprobit_8 xtprobit_d2 xtprobit_re_p xtps_fe xtps_lf xtps_ren xtps_ren_8 xtrar_p xtrc xtrc_p xtrchh xtrefe_p xtreg xtreg_be xtreg_fe xtreg_ml xtreg_pa_p xtreg_re xtregar xtrere_p xtset xtsf_ll xtsf_llti xtsum xttab xttest0 xttobit xttobit_8 xttobit_p xttrans xtunitroot yx yxview__barlike_draw yxview_area_draw yxview_bar_draw yxview_contour_draw yxview_contourline_draw yxview_dot_draw yxview_dropline_draw yxview_function_draw yxview_iarrow_draw yxview_ilabels_draw yxview_normal_draw yxview_patch_draw yxview_pcarrow_draw yxview_pcbarrow_draw yxview_pccapsym_draw yxview_pcscatter_draw yxview_pcspike_draw yxview_rarea_draw yxview_rbar_draw yxview_rbarm_draw yxview_rcap_draw yxview_rcapsym_draw yxview_rconnected_draw yxview_rline_draw yxview_rscatter_draw yxview_rspike_draw yxview_spike_draw zap_s zinb zinb_llf zinb_plf zip zip_llf zip_p zip_plf zipfile zt_ct_5 zt_hc_5 zt_hcd_5 zt_is_5 zt_iss_5 zt_sho_5 zt_smp_5 ztbase_5 ztcox_5 ztdes_5 ztereg_5 ztfill_5 ztgen_5 ztir_5 ztjoin_5 ztnb ztnb_p ztp ztp_p zts_5 ztset_5 ztspli_5 ztsum_5 zttoct_5 ztvary_5 ztweib_5");
  var builtins = wordObj("list quote bquote eval return call parse deparse Count");
  var string2s = wordObj("byte int long float double str1 str2 str3 str4 str5 str6 str7 str8 str9 str10 str11 str12 str13 str14 str15 str16 str17 str18 str19 str20 str21 str22 str23 str24 str25 str26 str27 str28 str29 str30 str31 str32 str33 str34 str35 str36 str37 str38 str39 str40 str41 str42 str43 str44 str45 str46 str47 str48 str49 str50 str51 str52 str53 str54 str55 str56 str57 str58 str59 str60 str61 str62 str63 str64 str65 str66 str67 str68 str69 str70 str71 str72 str73 str74 str75 str76 str77 str78 str79 str80 str81 str82 str83 str84 str85 str86 str87 str88 str89 str90 str91 str92 str93 str94 str95 str96 str97 str98 str99 str100 str101 str102 str103 str104 str105 str106 str107 str108 str109 str110 str111 str112 str113 str114 str115 str116 str117 str118 str119 str120 str121 str122 str123 str124 str125 str126 str127 str128 str129 str130 str131 str132 str133 str134 str135 str136 str137 str138 str139 str140 str141 str142 str143 str144 str145 str146 str147 str148 str149 str150 str151 str152 str153 str154 str155 str156 str157 str158 str159 str160 str161 str162 str163 str164 str165 str166 str167 str168 str169 str170 str171 str172 str173 str174 str175 str176 str177 str178 str179 str180 str181 str182 str183 str184 str185 str186 str187 str188 str189 str190 str191 str192 str193 str194 str195 str196 str197 str198 str199 str200 str201 str202 str203 str204 str205 str206 str207 str208 str209 str210 str211 str212 str213 str214 str215 str216 str217 str218 str219 str220 str221 str222 str223 str224 str225 str226 str227 str228 str229 str230 str231 str232 str233 str234 str235 str236 str237 str238 str239 str240 str241 str242 str243 str244 transmorphic matrix numeric vector real rowvector complex colvector string scalar pointer");
  var keywords = wordObj("if else repeat while function for in next break");
  var blockkeywords = wordObj("if else repeat while function for");
  var opChars = /[+\-*^<>=!&|~$:;,\.%]/;
  var curPunc;

  function tokenBase(stream, state) {
    curPunc = null;
    var ch = stream.next();
    
    // Inline and block comments  
    if (ch == "*") {
      stream.skipToEnd();
      return "comment";
    } else if (ch == "/") {
      if (stream.eat("*")) {
        state.tokenize = tokenComment;
        return tokenComment(stream, state);
      } else if (stream.eat("/")) {
        stream.skipToEnd();
        return "comment";
      }
      
    // Macros
    } else if (ch == "`") {
      state.tokenize = tokenMacro;
      return tokenMacro(stream, state);

    // Numbers
    } else if (ch == "0" && stream.eat("x")) {
      stream.eatWhile(/[\da-f]/i);
      return "number";
    } else if (ch == "." && stream.eat(/\d/)) {
      stream.match(/\d*(?:e[+\-]?\d+)?/);
      return "number";
    } else if (ch == "-" && stream.eat(/\d/)) {
      stream.match(/\d*(?:e[+\-]?\d+)?/);
      return "number";
    } else if (/\d/.test(ch)) {
      stream.match(/\d*(?:\.\d+)?(?:e[+\-]\d+)?L?/);
      return "number";
      
    // String
    } else if (ch == '"') {
      state.tokenize = tokenString(ch);
      return "string";
    
    // Keywords
    } else if (/[\w\.]/.test(ch) && ch != "_") {
      stream.eatWhile(/[\w\.]/);
      var word = stream.current();
      if (metas.propertyIsEnumerable(word)) return "meta";      
      if (atoms.propertyIsEnumerable(word)) return "atom";
      if (keywords.propertyIsEnumerable(word)) return "keyword";
      if (builtins.propertyIsEnumerable(word)) return "builtin";
      if (string2s.propertyIsEnumerable(word)) return "string-2";
      
      return "variable";
    
    // Other stuff (operators?)
    } else if (ch == "%") {
      if (stream.skipTo("%")) stream.next();
      return "variable-2";
    } else if (ch == "<" && stream.eat("-")) {
      return "arrow";
    } else if (ch == "=" && state.ctx.argList) {
      return "arg-is";
    } else if (opChars.test(ch)) {
      if (ch == "$") return "dollar";
      stream.eatWhile(opChars);
      return "operator";
    } else if (/[\(\){}\[\];]/.test(ch)) {
      curPunc = ch;
      if (ch == ";") return "semi";
      return null;
    } else {
      return null;
    }
  }

  function tokenComment(stream, state) {
    var maybeEnd = false, ch;
    while (ch = stream.next()) {
      if (ch == "/" && maybeEnd) {
        state.tokenize = tokenBase;
        break;
      }
      maybeEnd = (ch == "*");
    }
    return "comment";
  }
  
  function tokenMacro(stream, state) {
    var maybeEnd = true, ch;
    while (ch = stream.next()) {
      if (ch == "'" && maybeEnd) {
        state.tokenize = tokenBase;
        break;
      }
    }
    return "string-2";
  }
  
  function tokenString(quote) {
    return function(stream, state) {
      if (stream.eat("\\")) {
        var ch = stream.next();
        if (ch == "x") stream.match(/^[a-f0-9]{2}/i);
        else if ((ch == "u" || ch == "U") && stream.eat("{") && stream.skipTo("}")) stream.next();
        else if (ch == "u") stream.match(/^[a-f0-9]{4}/i);
        else if (ch == "U") stream.match(/^[a-f0-9]{8}/i);
        else if (/[0-7]/.test(ch)) stream.match(/^[0-7]{1,2}/);
        return "string";
      } else {
        var next;
        while ((next = stream.next()) != null) {
          if (next == quote) { state.tokenize = tokenBase; break; }
          if (next == "\\") { stream.backUp(1); break; }
        }
        return "string";
      }
    };
  }

  function push(state, type, stream) {
    state.ctx = {type: type,
                 indent: state.indent,
                 align: null,
                 column: stream.column(),
                 prev: state.ctx};
  }
  function pop(state) {
    state.indent = state.ctx.indent;
    state.ctx = state.ctx.prev;
  }

  return {
    startState: function() {
      return {tokenize: tokenBase,
              ctx: {type: "top",
                    indent: -config.indentUnit,
                    align: false},
              indent: 0,
              afterIdent: false};
    },

    token: function(stream, state) {
      if (stream.sol()) {
        if (state.ctx.align == null) state.ctx.align = false;
        state.indent = stream.indentation();
      }
      if (stream.eatSpace()) return null;
      var style = state.tokenize(stream, state);
      if (style != "comment" && state.ctx.align == null) state.ctx.align = true;

      var ctype = state.ctx.type;
      if ((curPunc == ";" || curPunc == "{" || curPunc == "}") && ctype == "block") pop(state);
      if (curPunc == "{") push(state, "}", stream);
      else if (curPunc == "(") {
        push(state, ")", stream);
        if (state.afterIdent) state.ctx.argList = true;
      }
      else if (curPunc == "[") push(state, "]", stream);
      else if (curPunc == "block") push(state, "block", stream);
      else if (curPunc == ctype) pop(state);
      state.afterIdent = style == "variable" || style == "keyword";
      return style;
    },

    lineComment: "//"
  };
});

CodeMirror.defineMIME("text/x-rsrc", "stata");

});