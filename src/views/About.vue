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
                            <img src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/wNL4CZB0wmieHVIdG7vbGEqnDK7ZVqsh1g0CEKF6ZjePAdXrfp4OwtkYI8cjwG810CRRgqllvc3iWbNyQ73Jym76DzCGgkrY5Gx8gwMWcLZCKw4XwBMzXXjGZG2hryzY.jpg" alt="">
                            <h4 class="text-center">潔 淨 的 環 境</h4>
                        </div>
                        <div class="position-relative mb-2 mb-lg-4 d-lg-flex flex-lg-row-reverse align-items-center">
                            <img src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/UDg82WwrKixK4nfbKNkJnYHMR3jEml6qex1iJVCYv6IgvWIJhPaWz1lakmeLGMbFmCS73vV3GH0qyXYzE7CtnZoREr93bhv0gEi9gwDfvX763aoXYWX7ZrhPDEwhu0Ed.jpg" alt="" class="hoverColor">
                            <h4 class="text-center">多 樣 的 藏 酒</h4>
                        </div>
                        <div class="position-relative mb-2 mb-lg-4 d-lg-flex align-items-center">
                            <img src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/Mhh0YJHYamk3qO0i9xiyEMzVOgiN8AnhYPbUf1Dbdlm5NcLYYilTTjNEOccjxUVzz5iVYBmbVz2Tf8M48VUZL6muxTAX5M7ew1VWOi0APVe2v1omcPW5WuJlZEwRH7GH.jpg" alt="">
                            <h4 class="text-center">一 流 的 技 術</h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="contact">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-10 col-lg-8">
                        <h4 class="text-center mb-3">聯絡我們</h4>
                        <p class="mb-3">我們相當重視您的意見，若您有任何疑問，請填妥以下資料，我們會在近期與您聯繫。</p>
                        <form class="form-group">
                            <label for="contactName" class="mb-0">姓名</label>
                            <input type="text" id="contactName" class="form-control mb-3" name="contactName">
                            <label for="contactTel" class="mb-0">連絡電話</label>
                            <input type="tel" id="contactTel" class="form-control mb-3" name="contactTel">
                            <label for="contactEmail" class="mb-0">電子郵件</label>
                            <input type="email" id="contactEmail" class="form-control mb-3" name="contactEmail">
                            <label for="opinion" class="mb-0">給賣家的意見</label>
                            <textarea name="opinion" id="opinion" rows="3" class="form-control mb-4"></textarea>
                            <div class="d-flex align-items-center">
                                <input type="checkbox" id="agree" class="mr-2">
                                <label for="agree" name="agree" class="mb-0">我同意隱私權政策，並同意依隱私權政策中所述的方式處理自己的資料。</label>
                            </div>
                            <div class="text-center pt-5">
                                <button type="submit" class="btn btn-main">確認送出</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
