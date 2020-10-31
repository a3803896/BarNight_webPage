<template>
  <div class="pb-5 pb-sm-0 text-white">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 no-p15">
          <div class="aboutBg d-flex justify-content-center">
            <div class="text-right">
              <p class="text-white noto bold">Bar Night <span class="text-main">夜吧</span></p>
              <h5 class="text-white noto bold">專心致志，為您獻上完美的一杯</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="infomation">
      <div class="container text-white">
        <div class="row justify-content-center">
          <div class="col-12 col-md-10 col-lg-12 py-5">
            <h4 class="text-center mb-4 mb-lg-5">用專業的心，做專業的事</h4>
            <div class="d-flex flex-wrap justify-content-center justify-content-md-between">
              <div class="myCard text-center mb-3 mb-md-4 mb-lg-0">
                <span class="material-icons">
                  monetization_on
                </span>
                <h5 class="mb-2">優惠實在的價格</h5>
                <p class="text-left">餐點價格都能在產品列表及訂單列表查詢，價格透明單一且實際，不灌單不加價是我們一貫作風。</p>
              </div>
              <div class="myCard text-center mb-3 mb-md-4 mb-lg-0">
                <span class="material-icons">
                  query_builder
                </span>
                <h5 class="mb-2">20 分鐘內保證出餐</h5>
                <p class="text-left">為了您的寶貴時間著想，以豐富專業知識與技術將結帳到出餐的時間縮減至最快 20 分鐘即可完成。</p>
              </div>
              <div class="myCard text-center mb-3 mb-md-4 mb-lg-0">
                <span class="material-icons">
                  favorite_border
                </span>
                <h5 class="mb-2">顧客至上的服務</h5>
                <p class="text-left">您的需求是我們唯一的考量，有任何需要隨時可向服務生反應，餐點及調酒皆能配合您的口味做調整。</p>
              </div>
              <div class="myCard text-center">
                <span class="material-icons">
                  local_bar
                </span>
                <h5 class="mb-2">關於調酒</h5>
                <p class="text-left">本店基酒皆選用國際知名品牌，除了酒單上的品項外，若有想喝的調酒都能向調酒師點購。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="recommend mb-5">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="position-relative mb-2 mb-lg-4 d-lg-flex align-items-center">
              <img
                src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/uGqj4x7JaxbCuCvo1MEj6NtlvpytAAXEMyRDcGdat3avQPpnoAYPwQlpljB2uOXLqpIULGrog1u2nOn2EUCDdcrT3HPxgKkDrkgP1vm4eMOK3Is9wagzAGdIENCIFc9n.jpg"
                alt="潔淨的環境">
              <h4 class="text-center">潔 淨 的 環 境</h4>
            </div>
            <div class="position-relative mb-2 mb-lg-4 d-lg-flex flex-lg-row-reverse align-items-center">
              <img
                src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/DhLLkL4YP0XFBI0q3gtJJlRebOmRIaC2uiludlXBtT5iOVug2wSTRJm3MrdlnQyQxGvqjfqE7aPpkwoj1uikNfUUUL30GbTWX6s738wXaNR2QZtLHNfoagjPQa2kh4Wp.jpg"
                alt="多樣的藏酒" class="hoverColor">
              <h4 class="text-center">多 樣 的 藏 酒</h4>
            </div>
            <div class="position-relative mb-2 mb-lg-4 d-lg-flex align-items-center">
              <img
                src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/BYErnZ4GKQGtnVkFDuhIAgE3cDdtn3TgPbXdonp2mgprNJXgEGYNcj18BMoOqs0N7X33ps2CvBHX3f0NquXr3ManOhlVD5PfrQixMcM4d3LdLyVBvOlbKeA7gK6PdnTY.jpg"
                alt="一流的技術">
              <h4 class="text-center">一 流 的 技 術</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="white-texture overflow-hidden py-5">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <ProductSwiper></ProductSwiper>
          </div>
        </div>
      </div>
    </div>
    <section class="contact py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-10 col-lg-8">
            <h4 class="text-center mb-3">聯絡我們</h4>
            <p class="mb-3">我們相當重視您的意見，若您有任何疑問，請填妥以下資料，我們會在近期與您聯繫。</p>
            <form class="form-group">
              <validation-observer v-slot="{ invalid }">
                <validation-provider rules="required" v-slot="{ errors, classes }">
                  <label for="contactName" class="mb-0">姓名</label>
                  <input v-model="form.name" :class="classes" type="text" id="contactName" class="form-control mb-2" name="姓名">
                  <span class="invalid-feedback mb-3">{{ errors[0] }}</span>
                </validation-provider>

                <validation-provider rules="required|min:8" v-slot="{ errors, classes }">
                  <label for="contactTel" class="mb-0">連絡電話</label>
                  <input v-model="form.tel" :class="classes" type="tel" id="contactTel" class="form-control mb-2" name="連絡電話">
                  <span class="invalid-feedback mb-3">{{ errors[0] }}</span>
                </validation-provider>

                <validation-provider rules="required|email" v-slot="{ errors, classes }">
                  <label for="contactEmail" class="mb-0">電子郵件</label>
                  <input v-model="form.mail" :class="classes" type="email" id="contactEmail" class="form-control mb-2" name="電子郵件">
                  <span class="invalid-feedback mb-3">{{ errors[0] }}</span>
                </validation-provider>

                <validation-provider rules="required" v-slot="{ errors, classes }">
                  <label for="message" class="mb-0">給賣家的意見</label>
                  <textarea v-model="form.message" :class="classes" name="給賣家的意見" id="message" rows="3" class="form-control mb-2"></textarea>
                  <span class="invalid-feedback mb-4">{{ errors[0] }}</span>
                </validation-provider>

                <div class="text-center pt-3">
                  <button type="submit" class="btn btn-main" :disabled="invalid">確認送出</button>
                </div>
              </validation-observer>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        email: '',
        tel: '',
        message: ''
      }
    }
  }
}
</script>
