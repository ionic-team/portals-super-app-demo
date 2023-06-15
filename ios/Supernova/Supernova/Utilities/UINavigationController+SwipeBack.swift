//
//  UINavigationController+SwipeBack.swift
//  Supernova
//
//  Created by Steven Sherry on 6/12/23.
//

import UIKit

// Copy-pasta from https://stackoverflow.com/questions/59234958/swiftui-navigationbarbackbuttonhidden-swipe-back-gesture
// This keeps swipe back gestures working when the toolbar is hidden on child views in a navigation stack
extension UINavigationController: UIGestureRecognizerDelegate {
    override open func viewDidLoad() {
        super.viewDidLoad()
        interactivePopGestureRecognizer?.delegate = self
    }

    public func gestureRecognizerShouldBegin(_ gestureRecognizer: UIGestureRecognizer) -> Bool {
        return viewControllers.count > 1
    }

    // To make it work with ScrollView
    public func gestureRecognizer(
        _ gestureRecognizer: UIGestureRecognizer,
        shouldRecognizeSimultaneouslyWith otherGestureRecognizer: UIGestureRecognizer
    ) -> Bool {
        true
    }
}
