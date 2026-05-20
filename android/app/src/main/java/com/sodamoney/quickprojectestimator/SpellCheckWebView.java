package com.sodamoney.quickprojectestimator;

import android.content.Context;
import android.text.InputType;
import android.util.AttributeSet;
import android.view.inputmethod.EditorInfo;
import android.view.inputmethod.InputConnection;
import com.getcapacitor.CapacitorWebView;

/**
 * Fixes spell-check / autocorrect on Android: Samsung keyboard (and others) suppress the
 * suggestion strip for TYPE_TEXT_VARIATION_WEB_EDIT_TEXT, which WebView assigns to every
 * <input type="text"> field. We change it to TYPE_TEXT_VARIATION_NORMAL so the suggestion
 * bar appears. We also clear IME_FLAG_NO_EXTRACT_UI for the same reason.
 */
public class SpellCheckWebView extends CapacitorWebView {

    public SpellCheckWebView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    @Override
    public InputConnection onCreateInputConnection(EditorInfo outAttrs) {
        InputConnection ic = super.onCreateInputConnection(outAttrs);
        if (ic != null && outAttrs != null) {
            int classType = outAttrs.inputType & InputType.TYPE_MASK_CLASS;
            if (classType == InputType.TYPE_CLASS_TEXT) {
                int variation = outAttrs.inputType & InputType.TYPE_MASK_VARIATION;
                if (variation == InputType.TYPE_TEXT_VARIATION_WEB_EDIT_TEXT) {
                    outAttrs.inputType = (outAttrs.inputType & ~InputType.TYPE_MASK_VARIATION)
                            | InputType.TYPE_TEXT_VARIATION_NORMAL;
                }
                outAttrs.imeOptions &= ~EditorInfo.IME_FLAG_NO_EXTRACT_UI;
            }
        }
        return ic;
    }
}
