import React from 'react'

function VeiclePanel(props) {
  return (
    <div>
      <div
          onClick={() => {
            props.setVeiclePanel(false);
          }}
          className="text-center absolute w-full top-0"
        >
          <i className="text-2xl ri-arrow-down-wide-line"></i>
        </div>

        <div onClick={()=>{
          props.setConfirmRide(true)
          props.setVeiclePanel(false)
          props.setCarType('car')
          }} className="flex mt-1 items-center mb-2 justify-between w-full p-2 border-2 active:border-black rounded-lg">
          <img
            className="w-24"
            src="https://cdn-iejhi.nitrocdn.com/NMxJCeGVpcAQdhpVLEQLtsJQObyxxCrn/assets/images/optimized/rev-97c573d/www.asaproadworthys.com.au/wp-content/uploads/2021/11/Select.jpeg"
            alt=""
          />
          <div>
            <h4 className="font-medium text-base">
              UberGo{" "}
              <span>
                <i className="ri-user-line"></i>4
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 min away</h5>
            <p className="font-normal text-xs text-gray-700">
              Affordable, compect rides
            </p>
          </div>
          <h2 className="text-xl font-semibold">₹{props.fare.car}</h2>
        </div>

        <div onClick={()=>{
          props.setConfirmRide(true)
          props.setVeiclePanel(false)
          props.setCarType('moto')
          }} className="flex items-center justify-between w-full mb-2 p-2 border-2 active:border-black rounded-lg">
          <img
            className="w-24"
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEBUSEBIWFRURFRYXFRYXExgXGBUWFhUWFhYVFRUYKCggGBomGxUVITEhJSkrLi4uGB8zODMsNygtLisBCgoKDQ0OGg0NFSsZHyUrLSsuKys3Li0rMzcrNCsrKzIrKysrNy0tKzcrKy04Kys4LTArKys0KzcrKysyLSwrK//AABEIALcBEwMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABwECBQYIBAP/xABDEAABAwIDBgMDCgMIAQUAAAABAAIDBBEFEiEGBzFBUWETInEygbEUI0JScoKRkqHBM2KiCBUkQ1Oy0fAWFzRzk+H/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJxREQEREBERAREQEREBERAREQEWs7ycdkocLqKmEDxGBrWEi4a6R7Yw+x0Ns17HQkBcxx7cYm2TxBX1OYm+s7y38hOW3a1kHYSLnDZjffXQvaK0NqYr+Y5WslA6tLbNNuhGvUcV0TSVLZY2SRnMyRrXtPVrgC0/gQg+yIiAvHi+JRU0ElRO7LHC0ucew5AcyeAHMlexa1vCwM11C6lDi0Sywh7mi5DBMwuIHa1+1r8kEN12/muMzjBBA2LN5GPa9zsv8zg4a+gU94HiIqaWCoAyioijlDb3y+IwOtftey5ch3cVkmJPoYmOIjkLTOWERtjB/iOPD2bG19ToF1PhVA2ngigjvlgjZG2/HKxoaL97BB6kREBERAREQEREBERAREQEREBERAREQEREBERAREQEREHmxGhjnifDMwPjlaWvaeBB4+nqNQobx3cE0uLqKryg8I5mZrdvEbrb7p96m1EHOdBuIrzK1s80DIr+d7Hue7LzyNLRc+tlPmHYf8nijhiN44mNYwHiGsAa0X56AL33VkszW+0bX4ILBUDg7T1X3Xmlma5pH6/uvjQVeZtreybaoPerJnANJKs8QrzYg172ZWEAnna9tNDbn6IPXCfKL819FGGJYTtMGWhxKmda+pgbG89BbI5vwWu/+F7UVFjLiPhdQKp7Le6BtignFF86dhDGhzszg0AutbMQNTblcr6ICIiAiIgIiICIiAiIgIiICIiAiIgK1zwOKuXjlaWuJJJDjcX5aAWHx96DVtst5tDhsgim8V8paHZI2A2ab2LnOIaOHUnstIqv7QUYPzVA5w6vqAw/gGO+K8+/fZKaV0dbBGZAxhZKGglwaCXMdlHEDM+55acuEIIOg8G390r3WqqWSG/0mPEzR3do0j3AqRMB2voK23yWqjkcRfJmyyf/AFus79FxwqtNjcaEIO4kXKWzO9PE6MgCczxj/Lnu8W7P9tvaxt2UzbIb46CrsyoPySU8pHDwyf5ZdAPvBvvQeXeNtRjcFb4GG0ZfEY2uErad8t3G4dd48jbEcCO/NauINsKji58bXc81PFb8vnU8NcCLg3B4HqjnAcUEA4Vutxv+8IamonaXRyxvdM6oc9+UEZgLjMTlBFtAeF7Ka58Lc4ayX52tYLIGYL5TPDmuabjMCLjiLi2iDDUFXFKCYZGSBri1xY4Os5psQbc17mEjmoa2HoJqDGhSvJFxIw8mysEbnxvA5jygjpqOqmUIPZG+4V68bHWK9LXXFwEReqA2Sx7Jl7oPsisjCvRRERAREQEREBERAREQEREBERAREQF8p48w7hfVEGOcLaFaBtpuqpK3NJD/AIec6lzR5Hn+dnC/cWPW6s30bdVGHS0jKbLdxfJK1wuHsFmtYeYBJcbixu0LNbEbcU2Jx3iOSZovJA4+ZvUtP02X+kO1wEHOu1OxlZh7rVMRyXsJW+aN33uXo6xWvrs6eFr2lkjQ5rhYgi4I6EFRdtjuZgmvJh7hBJx8M3MTj0HNnuuOyCAkWV2g2dqqKTJVQujPJ1rtd9l40PxWKQSRuZxCvkrmUsNXLHTgGSVlw4CNvEMa8EMLnOaLtsdey6M8Rc17jq4xYs0ZSRNFJGSBfLfK8E9BmY0X/mXSKC/MvlKdFcqINQx9oNVTylvnp5AQ/wDkd5ZG9wWk+9bbJwWHxykzAlR7iO11ZBPlinD2NID2Pa19hbUZvaB58eaCTvlLx0K+seIPGgA96hqbefUOY+8ErQ5rgJGtYMhIIDhe4JBtpdbVuW2glnMsdTI6R72iRpeblpacr2i/Aat0HQoJChqJXEaadm/usplCqiAiIgIiICIiAiIgIiICIiAiIgIiICIiAvBjuLxUdPJU1DsscTbnqeQa0c3EkADqV71pG8rYWXFmxRis8CKIlxZ4PiZ3nQPJzN4AkAdyg5t2w2kmxGrfVTaF+jGXuI4x7LG+l+PMknms5ux2NrK6Z01JL8n+S2d45vYPPBjbcTa5PK3HiLyXRbgaUfxqyZ/XIxkf+7PZRvtntIHWwvCszaKJ5a0MJc6rkLrOkkI1eC72W8LAacAAnjC8fijbHBWV9HJUk5PmpWjOTo35sm7XHhbgTwtey2Bcv/8AgGIU8XyuppiyKPzOLnszN08pdGDmHmy8RpzW3bvt7JhcKbEHF8Wgjn1c6PoJOb2/zcR35BNdfQxTsMc8bZGO4tc0OB9xWoRbqcJbL4nycnW4YZHlg+7fUduC3KnnbIxr43B7HgOa5pBa4HgWkaEL6IPDBhMMURigiZE3kGMDRccDovRSTZm66OGjh36+ixe0WPRU0TpJHhrGC7nH4DqTwsFBMu3nyvEWPnlmp6ZpIZ4UhY5pOgklLdXdwOA4X1zB0gij/Zn+9xVSRmeOop/C8SJ8mXO65GVrSy2cW+keo15LbcGxIz5mEBkrL5oySO129R8EHl2uxDwaWWTmxjiPcCVDeDYM44e6ue4ufNMb34ZA5zL+ue5v0I6KQt7hfDhksjy3zlkbbOuTmdc25ey134LM7O7Hj+6YYHmznUrQRbhI5mY/g8oI62qrM2COkP0AyEfaL2j8fDBKbPU78LraQyE2fDTyuJ+rNGGTA/Zdm/ALB4hDLNHFQahstdBnHNrjmhP+/wDQKUd8mFgwQVDR/Bf4bvsSAWv2Dmt/MgkhFhNjMS+UUMMhN3ZMr/tM8pJ9bX96zaAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIg1TeljBpMJqpWmzyzw2EGxDpSI7juA4n3KNdwWyrcj8RlaC4uMdPcXygaSSDuScoPKzuq2L+0XMRhUQB9urjB7gRTOt+IB9yyeyFRHQ4DTyuHljpmyEDTM6Xz2Hcufb3oNnrrFtiHWJ1LTYj1sQSO2qjvbnYWGtpy6JjY6gFzongBoeANI3gaWcBp0OvMg+TDtqqyceLI+ndG55c5gnMckDG+1ZjSC4BrcwuCTfjyGnUW3WIZiRM1zLktu1psCbgFpFxp3QYTY3byswt5jb54gTnp5LgB19cvON17/uCpFl340zmf+2ma4jUAsIB6B1xf1sozx6nNVO+dxax8pzODW2aXWAJAvoSRc9yVj4MLex7XBzfK4HVgcLg3F2O8rhfkdCgyO1e01Tikwa1jsjf4cLAXHoXOt7TtfdwHO+Y2F3VVtbO35TDLTU7TeR8jCx7h9SJjtST9a1hqddAcphu8rFKeMNY6nfb6JpmMHu8IsH6Bfd+/TE2O89LSgdMko/qzkINm3uVklA2kp8OvTiNjiHMA4Ns1rGk36uLuZzC56xE/aGpfITUTSPeeJdI43/8AxSxg+3dNjzHUNZC2CX2oSH5szgDcxkgZXD6utxdRjtjs5LS1AgkaS97gIi0fxASACz1uARyP6h96rFHTQw0r5D4Dqhj3N45TYse4Aa+y92gXU9HOySNr4nBzHNBa5puC22llynR7N1HyttG4FkrQXOuQ4Ma4AZiW3FgHD3robdlgL6KgEUkheXySP4kgNJAaG9AQ0Ot1cUGiY26Okx0v0LGzxvePq5w17r9xmzD3KU9psMFVRzQc5IyG/bHmYfc4NKgPGKp1RXYhPYlgqzGDy8jfDbb7sXwXvoN4eIva6DxgwQHKHBgMjhxBe91+thYDQINw3N4wAJaWRwDiQ9jSbEusRI0A8wGg27FSiuccPq5IHOdE+xeSXaDW+p4cFnsO2lnv/ELSOjiEE4Io4wjb2RhDagZ2/WFg4fs7/uqkChrI5mCSJwc13Aj4HoeyD7oiICIiAiIgIiICIiAiIgIiICIiAiIgi/8AtEUxfhLHD/KqY3H0LJWfF4WMxucu2YoyzUeHStdboxuXX77Whb3vOwv5VhFXEBd3hF7QOJdERKAPXJb3rRdz08dbgr6ObUQvfG4X1yPPiscOlnF1u7EEW4ptS+O8UcFO1zA6MTBjhLa2QknNkLrX82W+vXVYfAPpa9NPx1W37U7JOopi2WMOY8+SS3leOP3XdR8RqtWqcIF80Rynp/wUGRKLEMr5IzlmaT35/wDBWRgqWvF2m/xHuQfVbdu32Xirp3mpF4adoc5t7Z3OJyAkageVxNugWpRtzGwtxAuSGgE8AXGwHvKkrdI50UtTTyNLXvZFI1pFi4Rudmt1Hnbw6oM7tdu/pDSl1JCyF8ZD80bA14LdQ5r/AGgRxtfX1WuUm0mJzCOGTD3TSwPymovkjcLi0ouLZrcQD+HAS+HBw6gqJt5GImGiIgkc10rmMuHG9jckX7gW96DE4XtFSxYrilTUSZSWmCAZXOLvnAHFthpYQt1P1u63DCN72HCJkIdKZbOAHhHKXEktF+nDVafu12chmpxNLC18ktQ/I5wzZWNysFmnT28xvbktu3sSwxiCmjjY3J864hoFgGujZqOxk/AIIzp42QRgPd5pHeZx4vkedT+PwWvbQyyQzZ43ZfFaL2A1LdOfYhY7GsTdNLcEhrT5B07+q2rEaDxWxeOxzT5HuaQWus9oNtdQDcH0QanHjdQDcSuPrqPwKzuFbThxDZgGnk8cPvDl6/BSzgG7/CaiEB1KNQCHCWQO1HXNr71pm3m6CWlY6egc6eJoJfG4fOsA5jLpI3rYAjodSg9FNU30K2TZTaR1JLqSYnm0jen87R1H6hRNsxjFrQyH/wCMn/Yf2/DotyZJcIOiIpQ5oc0gtcAQRwIOoIV6jrdjtAT/AIOQ9XRH01cz4ke9SKgIiICIiAiIgIiICIiAiJdARUuqXQXKhK8tU15HldZYepL2+1dBnX1DOBcFzzg1WMCx+aB7rUtQbB30RG8l0Ml/5CSwn7Sl51UFom9LZ5tbTh8dvHguWfztOro79eY76c0EkVlPHMwxysa9juLXAEH/AL1WpzbtKBziR4rQfoiTQemYE/qo92A3pGmY2lrw50cflZKBd8YGmR7eLmjqNRa1jy3yt3o4ZHHnbUeIbXDGMfmPbzABvvIQaVvYwmjw+GBkLC6WZ7ic7y4+E1tj2F3ObbT6JUaNjY/+G7I76p/Y8/8Aui9O120cuIVTqiUAXs1jAbiOMXysB58SSeZJOnBZrdZsg7EK5mZt6eBwfOTwIBu2LuXEWt0zHkgmTdjUYfPh8FMyRhnjiAljcLPLuLzld/EaCbZm9teSyNRsZ4LxLROMLmm4a0Z4TxuDCfYvc3LMvcq7afd7R1h8RrTTz3zCWHy+bk5zRoT3Fnd1r4xvGMI0rY/l1K3/AD2H5xg6udx/OPvoNgxHaR8ItJTSC4/iN88QPDUsu8epbYcyor3o4qyWKmyAeZ0khLXtfGQwANLC3uXXuplwDaOhxFt6eQF9ruYfLK37TDxHcXHdQhvZf4+M/Jojm8MQ044AeJI7MRp3fb8UEobrqANpqRoGkUDXu0+nJeQ375pD+VaFvtxA/KqgX/04x6eG1zh+Jctow3a6uwn5jFcPLoxo2ppW3a4DQZr6X9S09lFe8PHPlrzUBuUSzPIbzaG+Vod/NlDb97oLN1Ozza3E42SNDoogZpQeBay2VpHMF5YCOhKlLeth1po5gNJW5XfaZwP5SPyrBf2c4BnrZLatbA0Hs4ykj+hqknb6g8ahksPNFaQfd9r+kuQa5u5xDyhpPsnL7jqFI7SoR2RrfCqMpOj/AIjUfupno5czA4cwggjfZsSKWUV1M3LDO60jWjSOU3OYW4NdY+hB6gLRINpZ2gC7XW5kG59bEXXVG0eEMrKSamk4TMLb/VdxY/1Dg0+5ch1VO6N7o3izo3Frh0c0kEfiEE4bhcWiqaiYStAqImB0RBNvDPlkIafpAluvR3LW83LkPdni5pMWpZb2aZRG/WwyS/Nuv1tmzerQuvEBERAREQEREBERARFaUAlUREBUJVVaUFF85BfivorSEGKrcJY/h5T2WuYjgUovl8wW6lqtLUEBbT7CMmeXtvFIeOl2u9R17haTV7E1kZ9gPHVhv+hsf0XVVTQseLOaD7lhqvZhp1jNuxQc/YBspE4/4rxQb8BYNPYmxKl3ZqrFJE2KnY1sbfogcTzJPEnuV7KnBHM9pnv4r4tpgOSDZqPH2O9q7T+iy8UwcNCCFowYvtDK5urSR6IPrj27eiqJBNGHU0oN88NmgnqWcAdTq2xWGrd0EHg/MVEjatswmFTJ5iXN4NIbazedxrfXXgtppcbePaGb4rK02KRv52PQoNC/9M6upN8SxeeUHjHFdrf6iW/0LF7y91kTaBr8OAZ8jbLJM17iXTMDS5z82uaQZeGgseVgFLzT0VJog9rmO1a9pa4dQ4WP6FBBv9nSYB9azm5sDgOzTKD/ALgppkaHAtcLhwII6g6Fc77rqg4fjpppTbOZaV54DOHeQ27vjaB9pdDByCC6ymdBVOjAJdFIWgAanKdNO4+KmHZov8PzNIBAIuLeq9zaaMOc4MaHP9pwaLu5eY8SvtGg+y5e3uUAhxipAFhI5so7+Ixr3H85cunwVzpv4I/vbT/Qiv6+b9rII7BXa+FVXiwRS/6kbH/maHfuuJ12Tsewtw6jaeIpYAfURMQZpFYqgoLkS6ICIiAiIgKhVUQWIqkKiAhCIgtIVFeqEILLKhar7KiD5lqpZfRLIPkWrxVOFxv5WPULIkKlkGtVGCPHs+YLHy0zm8QQt0srJIgeIug0myq0lbJUYOw+zosVU4e5ndBZT18jOB9xWUp8aH0xZYMlUzBBFm+/C/Br46+nNhUZSXD6E8VhftdoYR1IcpX2M2lZX0cdQ0jMRllaPoSD2h6HiOxCwm0+FR1lM+B5tmF2O+o8ey7/AJ7EqH9l9oKjB6x7XtJbcMniv7QHBzT1ANweYPdB0v4qva9YPAMdp6yIS00ge3nyc0/Ve3i0rLtcg9LXLl3ediYqcWqZGm7Wv8NvpE0R6diWk+9TPvM24ZQU7o43XqpmkRtFrxgi3iu6W5A8T2BXN6D0YdRummjhZ7Uz2Rt+09waP1K7UgjDGtY3gxoaPQCw+C513C7Lmet+WvHzVJfKfrTuHlHfK0lx6HJ1XRaC9FaCrkBXAq1EF6KgKqgIiICIiAqEKqILSFRXqlkFqKtlRASyIgplVtleiCxUJV9lQtQeSaqDV5ziBPBpK95gHRVDB0QYt1TKeDbKngPd7Sy2VULUGAqMLvwCxNTh8jeS3MtVrmdUEdVDXDQhaTtnsv8AKhnZYSNFmk8x9UnmPgpuqcNY/iFhqvZgH2Sg5gIqqKa4MkEg4OaS0kaXs4cRw7LLP3hYoW5TWPsRbQMDvzAX/VTxUbFiQZZQ1zTyc0EfgVrmJbmqd3miuw9ATb8D+yCCmtlnkNg+WR5ufae9x6niSVveyO6esqntdUg00NwXFw+ccOjWcj3da3Q8FtmH7E1NE75pxA52FgfULc8JxOdgAeLoNpwXC4aWBlPTsDI4xZrR+JJPMk3JKyDVjKTFGu9oZfgsnGQeBuguVzVQNVyAiKoCAFcqAKqAiIgIiICIiAiIgIiIKWVLIiCiIiAiIgJZURAyqmVEQUslkRBSyplREDKmREQDEDxF15ZcJjdyseyIg+bcHH1v0XvpqVrBoiIPtZLIiCtkREBERAREQf/Z"
            alt=""
          />
          <div>
            <h4 className="font-medium text-base">
              UberMoto{" "}
              <span>
                <i className="ri-user-line"></i>1
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 min away</h5>
            <p className="font-normal text-xs text-gray-700">
              Affordable motorcycle ride
            </p>
          </div>
          <h2 className="text-xl font-semibold">₹{props.fare.moto}</h2>
        </div>

        <div onClick={()=>{
          props.setConfirmRide(true)
          props.setVeiclePanel(false)
          props.setCarType('auto');
          }} className="flex items-center justify-between w-full mb-2 p-2 border-2 active:border-black rounded-lg">
          <img
            className="w-24"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
            alt=""
          />
          <div>
            <h4 className="font-medium text-base">
              UberAuto{" "}
              <span>
                <i className="ri-user-line"></i>3
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 min away</h5>
            <p className="font-normal text-xs text-gray-700">
              Affordable, compect ride
            </p>
          </div>
          <h2 className="text-xl font-semibold">₹{props.fare.auto}</h2>
        </div>
    </div>
  )
}

export default VeiclePanel