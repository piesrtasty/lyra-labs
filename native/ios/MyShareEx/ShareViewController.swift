
import MobileCoreServices
import Photos
import Social
import UIKit
import KeychainAccess
//import Foundation
//import Security




class CustomShareViewController: UIViewController {
    // MARK: Properties

    @IBOutlet var ctaButton: UIButton!
    @IBOutlet var openHostApp: UIButton!
    // TODO: IMPORTANT: This should be your host app bundle identifier
    let hostAppBundleIdentifier = "org.reactjs.native.example.lyralabs"
    let sharedKey = "ShareKey"
    var sharedMedia: [SharedMediaFile] = []
    var sharedText: [String] = []
    let imageContentType = kUTTypeImage as String
    let videoContentType = kUTTypeMovie as String
    let textContentType = kUTTypeText as String
    let urlContentType = kUTTypeURL as String
    let fileURLType = kUTTypeFileURL as String

    // MARK: Actions

    @IBAction func triggerCtaButton(_: UIButton) {
      print("Calling the CTA Button!!!!!! 4")
      // let keychain = Keychain(service: "YYX7RJEJSR.org.reactjs.native.example.lyralabs", accessGroup: "group.org.reactjs.native.example.lyralabs")
      let keychain = Keychain(service: "org.reactjs.native.example.lyralabs", accessGroup: "YYX7RJEJSR.org.reactjs.native.example.lyralabs")
      // let keychain = Keychain(service: "org.reactjs.native.example.lyralabs", accessGroup: "group.org.reactjs.native.example.lyralabs")
      // keychain["kishikawakatsumi"] = "01234567-89ab-cdef-0123-456789abcdef"
      let value = try! keychain.getData("cool")
      print("Start of value")
      print(keychain)
      print(value)
      print("End of Value")
//      let itemKey = "zuck"
//      let itemValue = "My secretive bee 🐝"
//      let keychainAccessGroupName = "YYX7RJEJSR.org.reactjs.native.example.lyralabs"
//
//      print(itemKey)
//      let queryLoad: [String: AnyObject] = [
//        kSecClass as String: kSecClassGenericPassword,
//        kSecAttrAccount as String: itemKey as AnyObject,
//        kSecReturnData as String: kCFBooleanTrue,
//        kSecMatchLimit as String: kSecMatchLimitOne,
//        kSecAttrAccessGroup as String: keychainAccessGroupName as AnyObject
//      ]

//      var result: AnyObject?
//
//      let resultCodeLoad = withUnsafeMutablePointer(to: &result) {
//        SecItemCopyMatching(queryLoad as CFDictionary, UnsafeMutablePointer($0))
//      }
//
//      if resultCodeLoad == noErr {
//        if let result = result as? Data,
//          let keyValue = NSString(data: result,
//                                  encoding: String.Encoding.utf8.rawValue) as? String {
//
//          // Found successfully
//          print("AAAAAA")
//          print(keyValue)
//          print("BBBBB")
//        }
//      } else {
//        print("Error loading from Keychain: \(resultCodeLoad)")
//      }

//      
//        extensionContext!.completeRequest(returningItems: nil, completionHandler: nil)

        //      let session = URLSession.shared
        //      let url = URL(string: "http://localhost:4000/healthz")!

        //   let task = session.dataTask(with: url) { data, response, error in

        //       if error != nil || data == nil {
        //           print("Client error!")
        //           return
        //       }

        //       guard let response = response as? HTTPURLResponse, (200...299).contains(response.statusCode) else {
        //           print("Server error!")
        //           return
        //       }

        //       guard let mime = response.mimeType, mime == "application/json" else {
        //           print("Wrong MIME type!")
        //           return
        //       }

        //       do {
        //           let json = try JSONSerialization.jsonObject(with: data!, options: [])
        //           print(json)
        //       } catch {
        //           print("JSON error: \(error.localizedDescription)")
        //       }
        //   }

        //   task.resume()
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        // Check if the user is logged in

        // If user is logged in then upload the post
        // This is called after the user selects Post. Do the upload of contentText and/or NSExtensionContext attachments.
        if let content = extensionContext!.inputItems[0] as? NSExtensionItem {
            if let contents = content.attachments {
                for (index, attachment) in contents.enumerated() {
                    if attachment.hasItemConformingToTypeIdentifier(imageContentType) {
                        handleUnsupportedMediaType()
                    } else if attachment.hasItemConformingToTypeIdentifier(textContentType) {
                        handleUnsupportedMediaType()
                    } else if attachment.hasItemConformingToTypeIdentifier(fileURLType) {
                        handleUnsupportedMediaType()
                    } else if attachment.hasItemConformingToTypeIdentifier(urlContentType) {
                        handleUrl(content: content, attachment: attachment, index: index)
                    } else if attachment.hasItemConformingToTypeIdentifier(videoContentType) {
                        handleUnsupportedMediaType()
                    }
                }
            }
        }
    }

    private func handleUnsupportedMediaType() {
        let alert = UIAlertController(title: "This media type is not supported yet.", message: nil, preferredStyle: UIAlertController.Style.alert)
        alert.addAction(UIAlertAction(title: "Ok", style: UIAlertAction.Style.default, handler: nil))
        present(alert, animated: true, completion: nil)
    }

    private func handleUrl(content _: NSExtensionItem, attachment: NSItemProvider, index _: Int) {
        attachment.loadItem(forTypeIdentifier: urlContentType, options: nil) { [weak self] data, error in

            if error == nil, let item = data as? URL, let this = self {
                print("calling handleUrl")
                print("calling handleUrl")
                print("item")
                print(item)
                print("done")
//        this.sharedText.append(item.absoluteString)
//
//        // If this is the last item, save imagesData in userDefaults and redirect to host app
//        if index == (content.attachments?.count)! - 1 {
//          let userDefaults = UserDefaults(suiteName: "group.\(this.hostAppBundleIdentifier)")
//          userDefaults?.set(this.sharedText, forKey: this.sharedKey)
//          userDefaults?.synchronize()
//           self?.didSelectPost();
//          this.redirectToHostApp(type: .text)
//        }

            } else {
                self?.dismissWithError()
            }
        }
    }

    private func dismissWithError() {
        print("[ERROR] Error loading data!")
        let alert = UIAlertController(title: "Error", message: "Error loading data", preferredStyle: .alert)

        let action = UIAlertAction(title: "Error", style: .cancel) { _ in
            self.dismiss(animated: true, completion: nil)
        }

        alert.addAction(action)
        present(alert, animated: true, completion: nil)
        extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
    }

    private func redirectToHostApp(type: RedirectType) {
        let url = URL(string: "ShareMedia://dataUrl=\(sharedKey)#\(type)")
        var responder = self as UIResponder?
        let selectorOpenURL = sel_registerName("openURL:")

        while responder != nil {
            if (responder?.responds(to: selectorOpenURL))! {
                _ = responder?.perform(selectorOpenURL, with: url)
            }
            responder = responder!.next
        }
        extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
    }

    enum RedirectType {
        case media
        case text
        case file
    }

    func getExtension(from url: URL, type: SharedMediaType) -> String {
        let parts = url.lastPathComponent.components(separatedBy: ".")
        var ex: String?
        if parts.count > 1 {
            ex = parts.last
        }

        if ex == nil {
            switch type {
            case .image:
                ex = "PNG"
            case .video:
                ex = "MP4"
            case .file:
                ex = "TXT"
            }
        }
        return ex ?? "Unknown"
    }

    func getFileName(from url: URL) -> String {
        var name = url.lastPathComponent

        if name == "" {
            name = UUID().uuidString + "." + getExtension(from: url, type: .file)
        }

        return name
    }

    func copyFile(at srcURL: URL, to dstURL: URL) -> Bool {
        do {
            if FileManager.default.fileExists(atPath: dstURL.path) {
                try FileManager.default.removeItem(at: dstURL)
            }
            try FileManager.default.copyItem(at: srcURL, to: dstURL)
        } catch {
            print("Cannot copy item at \(srcURL) to \(dstURL): \(error)")
            return false
        }
        return true
    }

    private func getSharedMediaFile(forVideo: URL) -> SharedMediaFile? {
        let asset = AVAsset(url: forVideo)
        let duration = (CMTimeGetSeconds(asset.duration) * 1000).rounded()
        let thumbnailPath = getThumbnailPath(for: forVideo)

        if FileManager.default.fileExists(atPath: thumbnailPath.path) {
            return SharedMediaFile(path: forVideo.absoluteString, thumbnail: thumbnailPath.absoluteString, duration: duration, type: .video)
        }

        var saved = false
        let assetImgGenerate = AVAssetImageGenerator(asset: asset)
        assetImgGenerate.appliesPreferredTrackTransform = true
        //        let scale = UIScreen.main.scale
        assetImgGenerate.maximumSize = CGSize(width: 360, height: 360)
        do {
            let img = try assetImgGenerate.copyCGImage(at: CMTimeMakeWithSeconds(600, preferredTimescale: Int32(1.0)), actualTime: nil)
            try UIImage.pngData(UIImage(cgImage: img))()?.write(to: thumbnailPath)
            saved = true
        } catch {
            saved = false
        }

        return saved ? SharedMediaFile(path: forVideo.absoluteString, thumbnail: thumbnailPath.absoluteString, duration: duration, type: .video) : nil
    }

    private func getThumbnailPath(for url: URL) -> URL {
        let fileName = Data(url.lastPathComponent.utf8).base64EncodedString().replacingOccurrences(of: "==", with: "")
        let path = FileManager.default
            .containerURL(forSecurityApplicationGroupIdentifier: "group.\(hostAppBundleIdentifier)")!
            .appendingPathComponent("\(fileName).jpg")
        return path
    }

    class SharedMediaFile: Codable {
        var path: String // can be image, video or url path. It can also be text content
        var thumbnail: String? // video thumbnail
        var duration: Double? // video duration in milliseconds
        var type: SharedMediaType

        init(path: String, thumbnail: String?, duration: Double?, type: SharedMediaType) {
            self.path = path
            self.thumbnail = thumbnail
            self.duration = duration
            self.type = type
        }

        // Debug method to print out SharedMediaFile details in the console
        func toString() {
            print("[SharedMediaFile] \n\tpath: \(path)\n\tthumbnail: \(thumbnail)\n\tduration: \(duration)\n\ttype: \(type)")
        }
    }

    enum SharedMediaType: Int, Codable {
        case image
        case video
        case file
    }

    func toData(data: [SharedMediaFile]) -> Data {
        let encodedData = try? JSONEncoder().encode(data)
        return encodedData!
    }
}

extension Array {
    subscript(safe index: UInt) -> Element? {
        return Int(index) < count ? self[Int(index)] : nil
    }
}
