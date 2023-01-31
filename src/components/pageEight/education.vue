<template>
    <div v-if="showEdu" class="popupState">
        <div class="blur"></div>

        <div class="stateParent">
            <div class="stateTxt">تحصیلات خود را انتخاب کنید</div>
            <div class="stateList">
                <div v-for="(item, index) in Edu" class="states"
                     :id="'Edu_' + index"
                     :class="[((index == numEdu  && activeRoute == 1) ? 'hoverState':'')]">
                    {{ item }}
                </div>

            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "education",
        props: ['activeRoute', 'showEdu'],
        data() {
            return {
                Edu: ['سیکل', 'دیپلم', 'لیسانس', 'فوق لیسانس', 'دکتری', 'فوق دکتری', 'حوزوی'],
                numEdu: 0,
                columnState: 4
            }
        },

        created() {
            this.$root.$emit('all_Edu', this.Edu);
        },
        methods: {

            up() {

                if ((this.numEdu) >= this.columnState) {
                    this.numEdu -= 4;
                    return true
                }
                return false;

            },
            down() {

                if ((this.numEdu + this.columnState) < (this.Edu.length)) {
                    this.numEdu += (this.columnState);

                    return true;
                }
                return false;

            },
            right() {

                if (this.numEdu % this.columnState != 0) {
                    this.numEdu--;
                    return true;
                }
                return false;


            },
            left() {
                if ((this.numEdu % this.columnState != (this.columnState) - 1) && (this.numEdu + 1 < this.Edu.length)) {
                    this.numEdu++;
                    return true;
                }
                return false;


            },
            enter() {

                let sendData = {
                    'education': this.Edu[this.numEdu],
                    'educationId': this.numEdu + 1,
                };
                this.$root.$emit('education_name', sendData);


                // this.selectItem = this.numstate;
                // this.stateID = this.state[this.numstate]['city_id'];
                // this.stateName = this.state[this.numstate]['city_persian'];
                // return {'stateID': this.stateID, 'stateName': this.stateName};


            },
            back() {
                this.showState = false;
                this.$root.$emit('close_education');
                return false;

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