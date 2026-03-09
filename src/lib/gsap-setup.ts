import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'
import { Observer } from 'gsap/Observer'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, CustomEase, Observer, Flip)

CustomEase.create('primary', 'M0,0 C0.16,1 0.3,1 1,1')
CustomEase.create('reveal', 'M0,0 C0.25,0.46 0.45,0.94 1,1')
CustomEase.create('snap', 'M0,0 C0.87,0 0.13,1 1,1')

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, CustomEase, Observer, Flip }
