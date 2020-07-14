export default {
  data () {
    return {
      name: 'rejectDataMixin'
    }
  },
  methods: {
    handleStr (arr) {
      if (!arr.length) return ''
      let str = ''
      arr.forEach(item => {
        if (!item.secondLevel) str += `${item.firstLevel}<br/>`
        else str += `${item.secondLevel}<br/>`
      })
      return str
    },
    handleFormData (name, val) {
      const oldVal = JSON.parse(val).old
      const newVal = JSON.parse(val).new
      const obj = {
        name,
        oldVal,
        newVal,
        reason: '',
        checked: false,
        type: 'default'
      }
      if (name === 'institutionalType') {
        const oldV = JSON.parse(oldVal)
        const newV = JSON.parse(newVal)
        return Object.assign(obj, {
          oldVal: this.handleStr(oldV),
          newVal: this.handleStr(newV)
        })
      } else if (name === 'goPublic') {
        return Object.assign(obj, {
          oldVal: +oldVal ? '否' : '是',
          newVal: +newVal ? '否' : '是'
        })
      } else if (
        name === 'includedInTheListShowhidden' ||
				name === 'institutionStatusShowhidden' ||
				name === 'actualControllerShowhidden'
      ) {
        return Object.assign(obj, {
          oldVal: +oldVal ? '隐藏' : '显示',
          newVal: +newVal ? '隐藏' : '显示'
        })
      } else if (name === 'mechanismPortraitLabel') {
        return Object.assign(obj, {
          oldVal: oldVal ? JSON.parse(oldVal).join(';') : '',
          newVal: newVal ? JSON.parse(newVal).join(';') : ''
        })
      }
      return obj
    },
    handleFormDataS (type, val) {
      const arr = JSON.parse(val)
      if (!arr.length) return
      return arr.map((item, idx) => {
        const name =
					type === 'branchChange'
					  ? `企业名称(${idx + 1})<br/>经营状态<br/>负责人<br/>成立时间`
					  : type === 'holderChange'
					    ? `股东信息(${idx + 1})<br/>股东身份<br/>认缴出资额<br/>出资比例`
					    : `姓名(${idx + 1})<br/>职位`
        const keyArr =
					type === 'branchChange'
					  ? ['companyName', 'state', 'header', 'establishmentDate']
					  : type === 'holderChange'
					    ? ['shareholder', 'holderTags', 'contributions', 'shareholding']
					    : ['name', 'position']
        let oldVal = ``
        let newVal = ``
        for (let key of keyArr) {
          let obj = JSON.parse(item[key])
          let o = obj !== null ? obj.old : ''
          let n = obj !== null ? obj.new : ''
          oldVal += `${o}<br/>`
          newVal += `${n}<br/>`
        }
        return {
          type,
          name,
          oldVal,
          newVal,
          reason: '',
          checked: false,
          initData: item
        }
      })
    },
    handleReason (str) {
      let arr = str ? JSON.parse(str) : []
      let rejectProFilter = this.$options.filters['rejectProFilter']
      let reason = ''
      arr.forEach(item => {
        if (item.name !== '') {
          reason += `字段 "${rejectProFilter(item.name)}" 审核驳回，驳回理由：${
            item.reason
          }。`
        }
      })
      return reason
    },
    handleISvHtml (type) {
      return (
        type === 'branchChange' ||
				type === 'staffChange' ||
				type === 'holderChange'
      )
    },
    handleChangeList (change) {
      let changeList = []
      for (let key in change) {
        if (this.handleISvHtml(key)) {
          const arr = this.handleFormDataS(key, change[key])
          if (arr && arr.length) changeList = changeList.concat(arr)
        } else {
          const result = this.handleFormData(key, change[key])
          changeList.push(result)
        }
      }
      return changeList
    }
  },
  filters: {
    rejectProFilter (val) {
      switch (val) {
        case 'organizationName':
          return '机构简称'
        case 'logoUrl':
          return '机构LOGO'
        case 'provinceName':
          return '省份'
        case 'cityName':
          return '城市'
        case 'establishmentDate':
          return '成立时间'
        case 'characterOfStructure':
          return '机构性质'
        case 'goPublic':
          return '是否上市'
        case 'stockCode':
          return '股票代码'
        case 'tel':
          return '联系电话'
        case 'institutionalType':
          return '机构类型'
        case 'website':
          return '官方网址'
        case 'institutionStatus':
          return '机构状态'
        case 'institutionStatusShowhidden':
          return '机构状态显示/隐藏'
        case 'problemTime':
          return '问题时间'
        case 'assetManagementScale':
          return '资产管理规模(万元)'
        case 'goodAtTo':
          return '擅长投向'
        case 'actualController':
          return '实际控制人'
        case 'actualControllerShowhidden':
          return '实际控制人显示/隐藏'
        case 'comprehensiveScoreCorrection':
          return '综合分值修正分值'
        case 'vietinbanhScoreCorrection':
          return '工商得分修正分值'
        case 'creditScoreCorrection':
          return '信用得分修正分值'
        case 'recordScoreCorrection':
          return '备案得分修正分值'
        case 'productScoreCorrection':
          return '产品得分修正分值'
        case 'performanceScoreCorrection':
          return '业绩得分修正分值'
        case 'hierarchyScoreCorrection':
          return '平台得分修正分值'
        case 'situationScoreCorrection':
          return '舆情得分修正分值'
        case 'includedInTheListShowhidden':
          return '入选榜单显示/隐藏'
        case 'includedInTheList':
          return '入选榜单'
        case 'mechanismPortraitLabel':
          return '机构画像标签'
        case 'seoTitle':
          return 'SEO标题'
        case 'seoTag':
          return 'SEO标签'
        case 'seoDescription':
          return 'SEO描述'
        case 'introductionToDescribe':
          return '简介描述'
        case 'companyName':
          return '公司名称'
        case 'englishName':
          return '英文名称'
        case 'legalPerson':
          return '法定代表人'
        case 'generalManager':
          return '总经理'
        case 'registeredCapital':
          return '注册资本'
        case 'paidInCapital':
          return '实缴资本'
        case 'operationStatus':
          return '经营状态'
        case 'creditCode':
          return '统一社会信用代码'
        case 'registrationNumber':
          return '工商注册号'
        case 'identificationNumber':
          return '纳税识别号'
        case 'organizationalCode':
          return '组织机构代码'
        case 'companyType':
          return '公司类型'
        case 'industry':
          return '所属行业'
        case 'approvalDate':
          return '核准日期'
        case 'registrationAuthority':
          return '登记机关'
        case 'personnelScale':
          return '人员规模'
        case 'insuredPersons':
          return '参保人数'
        case 'address':
          return '公司地址'
        case 'businessTerm':
          return '营业期限'
        case 'businessScope':
          return '经营范围'
        case 'actualControllingPerso':
          return '实际控股人'
        case 'branchChange':
          return '分支机构'
        case 'holderChange':
          return '股东信息'
        case 'staffChange':
          return '主要人员'
        case 'actualControllingPerson':
          return '实际控股人'
        default:
          return '未知'
      }
    }
  }
}
