<template>
	<div class="RiskInfoWrapper">
		<a-card title="风险信息"
			:hoverable="false">
			<a slot="extra"
				href="#">数据更新时间： xxxxxxxx</a>
			<ul class="topMenu">
				<li :class="{'active': current===index}"
					v-for="(item,index) in topMenuList"
					:key="item.id"
					@click="current = index">{{item.name}}<span>{{item.num}}</span></li>
			</ul>
			<h3>{{topMenuList[current].name}}<span>{{topMenuList[current].num}}</span></h3>
			<component :is="currentTabComponent[current]"
				:list="tmpList"></component>
		</a-card>
	</div>
</template>

<script>
import {
  OpeningNotice,
  LegalProceedings,
  CourtAnnouncement,
  BreakFaith,
  Executee,
  JudicialAssistance,
  FilingInformation,
  AbnormalOperation,
  AdministrativeSanction,
  EquityPledge,
  TaxArrears,
  JudicialAuction,
  ClearInformation,
  LandPledge,
  FinalCase
} from './../components/RiskInfo/'
const tmpList = [
  {
    id: 0,
    name: 1
  },
  {
    id: 0,
    name: 2
  }
]
export default {
  name: 'RiskInfo',
  components: {
    OpeningNotice,
    LegalProceedings,
    CourtAnnouncement,
    BreakFaith,
    Executee,
    JudicialAssistance,
    FilingInformation,
    AbnormalOperation,
    AdministrativeSanction,
    EquityPledge,
    TaxArrears,
    JudicialAuction,
    ClearInformation,
    LandPledge,
    FinalCase
  },
  data () {
    return {
      tmpList,
      currentTabComponent: [
        'opening-notice',
        'legal-proceedings',
        'court-announcement',
        'break-faith',
        'executee',
        'judicial-assistance',
        'filing-information',
        'abnormal-operation',
        'administrative-sanction',
        'equity-pledge',
        'tax-arrears',
        'judicial-auction',
        'clear-information',
        'land-pledge',
        'final-case'
      ],
      topMenuList: [
        {
          id: 'announcement',
          name: '开庭公告',
          num: 0
        },
        {
          id: 'lawsuit',
          name: '法律诉讼',
          num: 0
        },
        {
          id: 'court',
          name: '法院公告',
          num: 0
        },
        {
          id: 'dishonest',
          name: '失信信息',
          num: 0
        },
        {
          id: 'implement',
          name: '被执行人',
          num: 0
        },
        {
          id: 'judicialAid',
          name: '司法协助',
          num: 0
        },
        {
          id: 'courtRegister',
          name: '立案信息',
          num: 0
        },
        {
          id: 'abnormalRemove',
          name: '经营异常',
          num: 0
        },
        {
          id: 'punish',
          name: '行政处罚',
          num: 0
        },
        {
          id: 'equity',
          name: '股权出质',
          num: 0
        },
        {
          id: 'towntax',
          name: '欠税公告',
          num: 0
        },
        {
          id: 'judicialSale',
          name: '司法拍卖',
          num: 0
        },
        {
          id: 'clearing',
          name: '清算信息',
          num: 0
        },
        {
          id: 'landMortgages',
          name: '土地抵押',
          num: 0
        },
        {
          id: 'endCase',
          name: '终本案件',
          num: 0
        }
      ],
      current: 0
    }
  }
}
</script>

<style lang="less">
.RiskInfoWrapper {
	margin-top: 50px;
	.topMenu {
		flex-wrap: wrap !important;
		padding-bottom: 20px !important;
		border-bottom: 5px solid rgba(153, 153, 153, 0.21);
		li {
			width: 90px;
			margin-bottom: 10px !important;
			background: rgba(255, 255, 255, 1) !important;
			border-color: rgba(80, 80, 80, 1) !important;
			color: rgba(80, 80, 80, 1) !important;
			padding-right: 15px !important;
			position: relative;
			&.active {
				background-color: rgba(166, 166, 166, 0.25) !important;
			}
			span {
				position: absolute;
				top: 0;
				right: 3px;
				color: rgba(212, 48, 48, 0.84);
			}
		}
	}
	h3 {
		margin-top: 10px;
		font-weight: bold;
		color: rgba(80, 80, 80, 1);
		span {
			margin-left: 10px;
			color: red;
		}
	}
}
</style>
