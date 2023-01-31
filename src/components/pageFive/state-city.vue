<template>
    <div v-if="showState" class="popupState">
        <div class="blur"></div>

        <div class="stateParent">
            <div v-if="parentID == 0" class="stateTxt">استان محل اقامت خود را انتخاب کنید</div>
            <div v-else class="stateTxt">شهر محل اقامت خود را انتخاب کنید</div>
            <div class="stateList">
                {{ parentID }}
                <div v-if="parentID == 0"
                     v-for="(item, index) in states" class="states"
                     :id="'state_' + index"
                     :class="[((index ==numstate  && activeRoute == 1) ? 'hoverState':'')]">
                    {{ item.name }}
                </div>
                <div v-if="parentID == 1"
                     v-for="(item, index) in cities" class="states"
                     :id="'cities_' + index"
                     :class="[((index ==numCities  && activeRoute == 1) ? 'hoverState':'')]">
                    {{ item.name }}
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import api from '../../api/friends'
    import {ROAST_CONFIG} from '../../config'
    import IScroll from "../../js/iscroll"


    export default {
        name: "state-city",
        props: ['activeRoute', 'showState'],
        data() {
            return {

                numstate: 0,
                numCities: 0,
                columnState: 4,
                selectItem: 0,
                stateID: '',
                stateName: '',
                states: [],
                cities: [],
                filtering: [],
                sample: [],
                parentID: 0,
                myScroll: '',
                imgURL: ROAST_CONFIG.url_Img_comp,
            }
        },
        activated(){

        },
        created() {



            this.$root.$on('reset_city', () => {
                this.selectItem = 0;
                this.numstate = 0;
                this.numCities = 0;

            });

            this.sample = api.getstate();
            this.states = this.sample.data.states;
            this.$root.$emit('all_states', this.sample);
        },
        methods: {


            up() {
                if (this.parentID == 0) {
                    if ((this.numstate) >= this.columnState) {
                        this.numstate -= 4;
                        return true
                    }
                    return false;
                } else {
                    if ((this.numCities) >= this.columnState) {
                        this.numCities -= 4;
                        return true
                    }
                    return false;
                }
            },
            down() {
                if (this.parentID == 0) {
                    if ((this.numstate + this.columnState) < (this.states.length)) {
                        this.numstate += (this.columnState);

                        return true;
                    }
                    return false;
                } else {
                    if ((this.numCities + this.columnState) < (this.cities.length)) {
                        this.numCities += (this.columnState);

                        return true;
                    }
                    return false;
                }

            },
            right() {
                if (this.parentID == 0) {
                    if (this.numstate % this.columnState != 0) {
                        this.numstate--;
                        return true;
                    }
                    return false;
                } else {
                    if (this.numCities % this.columnState != 0) {
                        this.numCities--;
                        return true;
                    }
                    return false;
                }

            },
            left() {

                if (this.parentID == 0) {

                    if ((this.numstate % this.columnState != (this.columnState) - 1) && (this.numstate + 1 < this.states.length)) {
                        this.numstate++;
                        return true;
                    }
                    return false;
                } else {
                    if ((this.numCities % this.columnState != (this.columnState) - 1) && (this.numCities + 1 < this.cities.length)) {
                        this.numCities++;
                        return true;
                    }
                    return false;
                }


            }, enter() {

                if (this.parentID == 0) {
                    this.parentID = 1;

                    this.filtering = this.sample['data']['cities'];
                    this.cities = this.filtering.filter(data => (data['parent'] == this.sample['data']['states'][this.numstate]['id']));
                } else {

                 //   console.log(this.numstate)

                    let sendData = {
                        'state': this.sample['data']['states'][this.numstate]['name'],
                        'stateId': this.sample['data']['states'][this.numstate]['id'],
                        'city': this.cities[this.numCities]['name'],
                        'cityId': this.cities[this.numCities]['id'],
                    };

                  //  console.log('stateeeeeeeeeeeeeeeee->' + JSON.stringify(sendData))

                    this.parentID = 0;
                    this.$root.$emit('state_city_name', sendData);
                }
                // this.numstate = 0;
                //this.numCities = 0;

                // this.selectItem = this.numstate;
                // this.stateID = this.state[this.numstate]['city_id'];
                // this.stateName = this.state[this.numstate]['city_persian'];
                // return {'stateID': this.stateID, 'stateName': this.stateName};


            },
            back() {
                if (this.parentID == 1) {
                    this.parentID = 0;
                    this.numstate = 0;
                    this.numCities = 0;
                    return false;
                } else {
                    this.showState = false;
                    this.$root.$emit('close_state_city');
                    this.numstate = 0;
                    this.numCities = 0;
                    return false;
                }
            }

        }
    }
</script>

<style scoped>
    .popupState {

        position: fixed;
        top: 0px;
        left: 0px;
        width: 1920px;
        height: 1080px;
        z-index: 11;
    }

    .blur {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        background-color: #000;
        opacity: 0.8;
    }

    .stateParent {
        width: 1530px;
        height: 945px;
        position: absolute;
        top: 90px;
        left: 180px;

    }

    .stateTxt {
        width: 100%;
        height: 50px;
        line-height: 50px;
        position: absolute;
        font-size: 25px;
        color: #fff;
        text-align: right;
        text-indent: 30px;
        direction: rtl;
    }

    .stateList {
        width: 100%;
        height: 900px;
        position: relative;
        top: 40px;
        overflow: hidden;

    }

    .states {
        background-color: #fff;
        position: relative;
        float: right;
        width: 335px;
        height: 70px;
        margin-top: 30px;
        margin-right: 30px;
        border-radius: 10px;
        font-size: 25px;
        color: #000;
        line-height: 70px;
        border: 5px solid transparent;

    }

    .hoverState {
        border-width: 5px;
        border-color: rgb(9, 206, 88);
        border-style: solid;
        border-radius: 10px;
        box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.26);
    }

    .selectSort {
        background-color: #00fe67;

    }
</style>